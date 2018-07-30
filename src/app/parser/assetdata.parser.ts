import * as _ from 'lodash';
import { assetProperties, assetName, WorkerName, WorkersSkills } from '../constants';

export function AssetDataParser(data){
  const dataitems = data;
  const tempresult = [];
  const result = [];
  const timeKey = 'updatedAt';
  const assetData = [];
  const workerData =[];
  // data will be passed to parser as an argument
    const first = dataitems[Object.keys(dataitems)[0]];
    _.forEach(first , (datakey)=>{
	  	const tempresult = [];
    	_.forEach(datakey, (val,key) =>{
    		if(assetProperties.indexOf(key)!==-1 ){
          if(key === timeKey){
            tempresult[timeKey] = val.$date;
          }
          else{
            tempresult[key] = val;
          }
    		}
    	})
    	result.push(tempresult);
    })
    _.forEach(result, (item)=>{
      if(assetName.indexOf(item.description)!== -1){
        assetData.push(item);
      }
      if(WorkerName.indexOf(item.description)!== -1){
        var worker = _.find(WorkersSkills, ['name', item.description]);
        item.skill =  worker.skill;
        item.alias = worker.alias;
        workerData.push(item);
      }
    })
     	console.log('result', assetData, workerData);
     	return {assetData, workerData};
};
