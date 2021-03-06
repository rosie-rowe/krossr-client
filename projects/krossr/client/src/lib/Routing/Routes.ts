import { Ng2StateDeclaration, Transition } from '@uirouter/angular';
import { HomeComponent } from '../Home/HomeComponent';
import { LevelComponent } from '../Level/LevelComponent';
import { ForgotPasswordComponent } from '../ForgotPassword/ForgotPasswordComponent';
import { ResetPasswordComponent } from '../ResetPassword/ResetPasswordComponent';
import { HomeRoutes, LevelRoutes, UserRoutes } from './RouteNames';
import { NotFoundComponent } from '../NotFound/NotFoundComponent';
import { ResetPasswordService } from '../ResetPassword/ResetPasswordService';

export class Routes {
    static getNg2Routes(): Ng2StateDeclaration[] {
        let tokenValidResolve = 'tokenValid';

        let appRoutes = [
            {
                name: HomeRoutes.home,
                url: '/',
                component: HomeComponent
            },
            /** Level */
            {
                name: LevelRoutes.create,
                url: '/level/new',
                component: LevelComponent,
                resolve: [
                    { provide: 'mode', useFactory: () => 'new' }
                ]
            },
            {
                name: LevelRoutes.read,
                url: '/level/:levelId',
                component: LevelComponent,
                resolve: [
                    { provide: 'mode', useFactory: () => 'view' },
                    {
                        token: 'levelId',
                        deps: [Transition],
                        resolveFn: (trans) => {
                            return trans.params().levelId;
                        }
                    }
                ]
            },
            {
                name: LevelRoutes.update,
                url: '/level/:levelId/edit',
                component: LevelComponent,
                resolve: [
                    { provide: 'mode', useFactory: () => 'edit' },
                    {
                        token: 'levelId',
                        deps: [Transition],
                        resolveFn: (trans) => {
                            return trans.params().levelId;
                        }
                    }
                ]
            },
            /** Password */
            {
                name: UserRoutes.resetInvalid,
                url: '/password/reset/invalid',
                component: ForgotPasswordComponent,
                resolve: [
                    { provide: 'invalid', useFactory: () => true }
                ]
            },
            {
                name: UserRoutes.reset,
                url: '/password/reset/:token',
                component: ResetPasswordComponent,
                redirectTo: (trans) => {
                    let tokenValidResolvePromise: Promise<boolean> = trans.injector().getAsync(tokenValidResolve);

                    return tokenValidResolvePromise.then((valid: boolean) => {
                        return valid ? null : UserRoutes.resetInvalid;
                    });
                },
                resolve: [
                    {
                        token: 'token',
                        deps: [Transition],
                        resolveFn: (trans) => trans.params().token
                    },
                    {
                        token: tokenValidResolve,
                        deps: [Transition, ResetPasswordService],
                        resolveFn: (trans, resetPasswordService: ResetPasswordService) => {
                            return resetPasswordService.validateToken(trans.params().token);
                        }
                    }
                ]
            },
        ];

        // always comes last
        appRoutes.push({
            name: HomeRoutes.notFound,
            url: '/notfound',
            component: NotFoundComponent
        });

        return appRoutes;
    }
}
