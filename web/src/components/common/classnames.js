
export function classnames(classSet) {
    var ret = '';
    for(var i in classSet){
        if(classSet[i] == true){
            ret+=" "+i;
        } 
    }
    return ret;
}
