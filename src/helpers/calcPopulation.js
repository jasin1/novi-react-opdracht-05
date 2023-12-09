function calcPopulation(population){
    let result;
    if(population >= 1000000){
        result =  (population / 1000000).toFixed(2) + " million";
    }else if(population >= 1000){
        result =  (population / 1000).toFixed(3) + " thousand";
    }
    else{
        result = population.toString();
    }

    return result;

}

export default calcPopulation;