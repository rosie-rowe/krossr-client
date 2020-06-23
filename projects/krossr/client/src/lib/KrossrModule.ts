// TODO
// import '!!style-loader!css-loader!../less/reset.css';
// import '!!style-loader!css-loader!less-loader!../less/modules.less';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { GameOverComponent } from './GameOver/GameOverComponent';
import { NumberLineComponent } from './NumberLine/NumberLineComponent';
import { NumberGridComponent } from './NumberGrid/NumberGridComponent';
import { StarRatingComponent } from './StarRating/StarRatingComponent';
import { ModeSelectorComponent } from './ModeSelector/ModeSelectorComponent';
import { TileComponent } from './Tile/TileComponent';
import { GameComponent } from './Game/GameComponent';
import { LevelSelectComponent } from './LevelSelect/LevelSelectComponent';
import { HeaderComponent } from './Header/HeaderComponent';
import { PaginationComponent } from './Pagination/PaginationComponent';
import { LoadingAnimationComponent } from './LoadingAnimation/LoadingAnimationComponent';
import { HelpComponent } from './Help/HelpComponent';
import { PopupContentComponent } from './PopupContent/PopupContentComponent';
import { EditProfileComponent } from './EditProfile/EditProfileComponent';
import { SignInComponent } from './SignIn/SignInComponent';
import { ForgotPasswordComponent } from './ForgotPassword/ForgotPasswordComponent';
import { ResetPasswordComponent } from './ResetPassword/ResetPasswordComponent';
import { SignUpComponent } from './SignUp/SignUpComponent';
import { ConfirmationComponent } from './Confirmation/ConfirmationComponent';
import { Routes } from './Routing/Routes';
import { ChangePasswordComponent } from './ChangePassword/ChangePasswordComponent';
import { UpdateUserComponent } from './User/UpdateUserComponent';
import { LevelComponent } from './Level/LevelComponent';
import { ShellComponent } from './Shell/ShellComponent';
import { ResizeDirective } from './Resize/ResizeDirective';
import { GameResizeService } from './GameSize/GameResizeService';
import { HomeComponent } from './Home/HomeComponent';
import { LevelEditorFormComponent } from './LevelEditorForm/LevelEditorFormComponent';
import { uiRouterConfigFn } from './Config/RouterConfig';
import { UIRouterModule } from '@uirouter/angular';
import { LevelSelectFilterComponent } from './LevelSelectFilter/LevelSelectFilterComponent';
import { KrossrButtonComponent } from './KrossrButton/KrossrButtonComponent';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        MatDialogModule,
        ReactiveFormsModule,
        UIRouterModule.forRoot({ states: Routes.getNg2Routes(), config: uiRouterConfigFn })
    ],
    declarations: [
        ChangePasswordComponent,
        ConfirmationComponent,
        EditProfileComponent,
        ForgotPasswordComponent,
        GameComponent,
        GameOverComponent,
        HomeComponent,
        KrossrButtonComponent,
        LevelComponent,
        HeaderComponent,
        HelpComponent,
        LoadingAnimationComponent,
        LevelEditorFormComponent,
        LevelSelectComponent,
        LevelSelectFilterComponent,
        ModeSelectorComponent,
        NumberGridComponent,
        NumberLineComponent,
        PaginationComponent,
        PopupContentComponent,
        ResetPasswordComponent,
        ResizeDirective,
        ShellComponent,
        SignInComponent,
        SignUpComponent,
        StarRatingComponent,
        TileComponent,
        UpdateUserComponent,
    ],
    entryComponents: [
        ChangePasswordComponent,
        ConfirmationComponent,
        EditProfileComponent,
        ForgotPasswordComponent,
        GameComponent,
        GameOverComponent,
        HomeComponent,
        KrossrButtonComponent,
        LevelComponent,
        HeaderComponent,
        HelpComponent,
        LoadingAnimationComponent,
        LevelEditorFormComponent,
        LevelSelectComponent,
        LevelSelectFilterComponent,
        ModeSelectorComponent,
        NumberGridComponent,
        NumberLineComponent,
        PaginationComponent,
        PopupContentComponent,
        ResetPasswordComponent,
        ShellComponent,
        SignInComponent,
        SignUpComponent,
        StarRatingComponent,
        TileComponent,
        UpdateUserComponent
    ],
    bootstrap: [
        ShellComponent
    ],
    exports: [
        ShellComponent
    ],
    providers: [
        { provide: 'window', useValue: window }
    ]
})
export class KrossrModule {
    constructor(
        private gameResizeService: GameResizeService
    ) {
        this.gameResizeService.initialize();
    }
}
