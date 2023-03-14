import React,{useState,useEffect} from "react";
import axios from 'axios';

const GlobalVar = () => {

    const [RockDrillMaster, setRockDrillMaster] = useState([]);

    const getRockDrillMaster = () => {
        console.log(RockDrillMaster)
        axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
            setRockDrillMaster(res.data);
        }).catch(err => console.log(err.message));
    }
    useEffect(()=>{
        getRockDrillMaster();
    },[])
    return (
    <div className="col-md-12">
      <select
        className="form-select bgepirocgrey text-white"
        name="Rock_type"
        value={RockDrillMaster.value} 
        
      >
        <option value="" disabled selected>
          {" "}
          Rock Drill
        </option>
        {RockDrillMaster.map((e, key) => {
          return (
            <option key={key} value={e.RockDrillMaster}>
              {e.RockDrillMaster}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default GlobalVar;