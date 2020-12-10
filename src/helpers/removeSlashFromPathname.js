export default function removeSlash(str){
    console.log(str)
    return str && /\w+/.exec(str) ?  /\w+/.exec(str)[0] : "home"
}