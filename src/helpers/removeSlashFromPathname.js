export default function removeSlash(str){
    return /\w+/.exec(str)[0]
}