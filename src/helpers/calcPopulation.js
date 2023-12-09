function calcPopulation(population) {
    // if (population >= 1000000000) {
    //     return (population / 1000000000).toFixed(2) + " billion";
    // }
    // if (population >= 1000000) {
    //     return (population / 1000000).toFixed(2) + " million";
    // }
    // if (population >= 1000) {
    //     return (population / 1000).toFixed(3) + " thousand";
    // }
    // return population.toString();

    switch (true) {
        case population >= 1000000000:
            return (population / 1000000000).toFixed(2) + " billion";
        case population >= 1000000:
            return (population / 1000000).toFixed(2) + " million";
        case population >= 1000:
            return (population / 1000).toFixed(3) + " thousand";
        default:
            return population.toString();
    }
}

export default calcPopulation;