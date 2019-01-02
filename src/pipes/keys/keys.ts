import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the KeysPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'keys',
})
export class KeysPipe implements PipeTransform {
    /**
     * Takes a value and makes it lowercase.
     */

    transform(value, args: string[]): any {
        let keys = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        console.log(keys);
        return keys;
    }

}
