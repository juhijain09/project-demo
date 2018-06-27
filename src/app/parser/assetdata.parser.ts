import * as _ from 'lodash';
import { assetProperties } from '../constants';

export function AssetDataParser(data){
  const dataitems = data;
  const tempresult = [];
  const result = [];
  // data will be passed to parser as an argument
    const first = dataitems[Object.keys(dataitems)[0]];
    _.forEach(first , (datakey)=>{
	  	const tempresult = [];
    	_.forEach(datakey, (val,key) =>{
    		if(assetProperties.indexOf(key)!==-1 ){
    			tempresult[key] = val;
    		}
    	})
    	result.push(tempresult);
    })
     	console.log('result', result);
     	return result;
}
