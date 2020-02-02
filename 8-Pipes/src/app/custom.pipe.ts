import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name:'shorten'
})

// For Implementing Pipes..
// 1. Add Pipe decorator
// 2. Add transform method using implementing pipetransform
// 3. Add to decalaration in app.module


export class CustomPipes implements PipeTransform{

    transform(value:any, limit:number){
        if(value.length > limit){
            return value.substr(0,limit) + ' ...';
        }
        return value;
    }

}