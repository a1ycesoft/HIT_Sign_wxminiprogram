function nfctochinese(str) {
    switch (str) {
        case "admin":
            return "管理员测试用标签"
            break;
        case "zhulou":
            return "主楼"
            break;
        case "yanjiuyuan":
            return "研究院"
            break;
        case "liugongyu":
            return "六公寓"
            break;
        case "tushuguan":
             return "图书馆"
             break;
        case "tiyuchang":
            return "体育场"
            break;
        default:
            return "error"
            break;
    }
}
function chinesetonfc(str) {
    switch (str) {
        case "管理员测试用标签":
            return "admin" 
            break;
        case "主楼":
            return "zhulou"
            break;
        case "研究院":
            return "yanjiuyuan"
            break;
        case "六公寓":
            return "liugongyu"
            break;
        case "图书馆":
             return "tushuguan"
             break;
        case "体育场":
             return "tiyuchang"
             break;
        default:
            return "error"
            break;
    }
}
module.exports.nfctochinese = nfctochinese
module.exports.chinesetonfc = chinesetonfc