function manipulate(meString){
    meString += sha256(meString);
    meString = sha256(meString);
    for(var i = 0; i < 20; i++){
        meString = btoa(meString);
        meString = meString.slice(0, -2);
    }
    
    var out = "";
    for (var i = 0; i < meString.length; i++) {
        out += meString[i].charCodeAt(0).toString(2);
    }
    
    out.substring(4);

    var str = out.match(/.{1,7}/g).join(" ");

    var newBinary = str.split(" ");
    var binaryCode = [];

    for (i = 0; i < newBinary.length; i++) {
        var val = parseInt(newBinary[i], 2);
        binaryCode.push(String.fromCharCode(val));
    }
    
    binaryCode = binaryCode.join("");
    binaryCode = binaryCode.substring(400);
    
    var shaMix ='';
    for(i = 0; i < Math.round(binaryCode.length/32)-3; i++){
        var start = binaryCode.substring(i*32, (i+1)*32);
        var end = binaryCode.substring(binaryCode.length - (i+1)*32, binaryCode.length - i*32);
        var combi = end + start;
        var combiSha = sha256(combi);
        shaMix +=combiSha;
    }
    var out = "";
    for (var i = 0; i < shaMix.length; i++) {
        out += shaMix[i].charCodeAt(0).toString(2);
    } 
    var str = out.match(/.{1,7}/g).join(" ");
    var newBinary = str.split(" ");
    var output = [];

    for (i = 0; i < newBinary.length; i++) {
        var val = parseInt(newBinary[i], 2);
        if(val < 32){
            val +=45;
        }
        if(val==127){
            val -=12;
        }
        output.push(String.fromCharCode(val));
    }
    
    
    output = output.join("");
    
    return output;
}