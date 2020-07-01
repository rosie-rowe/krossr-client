import { Injectable } from '@angular/core';
import { LevelList } from './LevelList';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LevelParams } from './LevelParams';
@Injectable({
    providedIn: 'root'
})
export class LevelService {
    constructor(
        private httpClient: HttpClient
    ) {
    }

    /**
     * Converts a base64 string that decodes into a binary string into a layout
     * This assumes the layout was square, like most everything else
     */
    decodeLayout(layout): boolean[][] {
        // base64 string to binary string
        let binary: string = atob(layout);

        // how many characters of that binary string we should grab at once
        let sideLength = Math.sqrt(binary.length);

        let regexp = new RegExp('.{1,' + sideLength + '}', 'g');

        // evenly split up binary strings
        let split: string[] = binary.match(regexp);

        // convert to actual layout
        let resultLayout = split.map((binaryString) => {
            return binaryString.split('').map((value) => {
                return value === '1';
            });
        });

        return resultLayout;
    }

    createLevel(params: LevelParams) {
        return this.httpClient.post('levels', params).toPromise();
    }

    getLevel(levelId: number) {
        return this.httpClient.get(`levels/${levelId}`).toPromise();
    }

    getLevels(query: any): Promise<LevelList> {
        return this.httpClient.get('levels', {
            params: new HttpParams({ fromObject: query})
        }).toPromise().then((result: LevelList) => result);
    }

    updateLevel(params: LevelParams) {
        return this.httpClient.put(`levels/${params.id}`, params).toPromise();
    }

    removeLevel(levelId: number) {
        return this.httpClient.delete(`levels/${levelId}`).toPromise();
    }
}
