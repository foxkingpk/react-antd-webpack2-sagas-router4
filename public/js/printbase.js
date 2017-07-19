! function(document, undefined) {
    var kdPrintBase = function() {
        return true;
    }

    var printParam = [{
        name: "寄件人信息",
        items: {
            sendname: "寄件人姓名",
            sendcompany: "寄件人公司名称",
            sendaddr: "寄件地址",
            sendmobile: "寄件人联系电话",
            sendcity: "始发城市",
            sendzipcode: "寄件人邮政编码"
        }
    }, {
        name: "收件人信息",
        items: {
            recname: "收件人姓名",
            reccompany: "收件人公司名称",
            recaddr: "收件地址",
            recmobile: "收件人联系电话",
            reccity: "目的城市",
            reczipcode: "收件人邮政编码"
        }
    }, {
        name: "寄送物品",
        items: {
            cargo: "物品名称",
            comment: "备注",
            weight: "重量",
            volume: "体积",
            count: "数量"
        }
    }, {
        name: "快递服务与费用",
        items: {
            date: "寄件日期",
            payment: "付款方式",
            transport: "运输方式",
            freight: "快递费小写",
            freightDX: "快递费大写",
            valins: "保价金额小写",
            valinsDX: "保价金额大写",
            valinspay: "保价费用",
            collection: "代收货款小写",
            collectionDX: "代收货款大写",
            collectionNum: "代收货款卡号",
            customAddr: "第三方地址",
            cusprintarea: "自定义内容"
        }
    }, {
        name: "快递员与网点",
        items: {
            logo: "快递公司logo",
            gotcourier: "揽件员",
            payaccount: "月结账号"
        }
    }];
    var printData = kdPrintBase.printData = {
        kuaidiNum: "1234567890",
        sendName: "XXX先生",
        sendcity: "四川",
        sendcompany: "四川艾客思科技有限责任公司",
        sendaddr: "四川省绵兴东路128号创业服务中心A309",
        sendmobile: "13800138000",
        sendzipcode: "100000",
        recName: "火星人",
        reccompany: "中国最牛B的互联网公司",
        reccity: "北京",
        recaddr: "火星市火星大街123号",
        recmobile: "13800138000",
        reczipcode: "621000",
        comment: "小心易爆",
        cargo: "邮寄炸弹",
        weight: "1kg",
        payment: "SHIPPER",
        volume: "10*10*10",
        transport: "2",
        count: "2",
        freight: "12",
        valins: "1200",
        valinspay: "8",
        collection: "2321",
        cusprintarea: "自定义内容"
    };
    var printTempData = {};
    var printMachineData = {};
    var printBackTempData = {};
    var printParamData = {};
    kdPrintBase.setPrintData = function(data) {
        printData = data;
    }
    kdPrintBase.setPrintTempData = function(data) {
        printTempData = data;
    }
    kdPrintBase.getPrintParam = function() {
        return printParam;
    }
    kdPrintBase.getPrintParamData = function() {
        return printParamData;
    }
    kdPrintBase.setPrintParamData = function(data) {
        printParamData = data;
    }
        //该函数为打印预览做准备，主要工作在模板设置上
    var printPreview = kdPrintBase.printPreview = function(callback) {
        var note = printTempData.note; //获取打印模板
        //替换图片设置为对应模板图片链接
        //note = note.replace("{IMAGE}", "<img src='//cdn.kuaidi100.com/images/notes/" + printTempData.company + "/" + printTempData.tempid + "/big.jpg?version=1' />", "g")
        //设置打印选项
        note = printParamReplace(note, printParamData);
        //设置单的内容
        note = printContentReplace(note, printData, printTempData);
        note = printNumReplace(note, printTempData.company, printData.kuaidiNum);
        //设置给绿豆皮要打印的模板信息全局变量
        kdPrint.setTemp(note);
        if (callback) {
            callback();
        }
        //kdPrint.preview();
    }
    var printStart = kdPrintBase.printStart = function(printData, machine, callback) {
        var childNum = printData.childNum;
        var returnNum = printData.returnNum;
        var title = printData.recname + printData.recmobile;
        var note = printTempData.note;
        var missionCount = 1;
        var finish = function(P_ID) {
            //打印任务ID
            missionCount--;
            if (missionCount == 0) {
                if (callback) callback(P_ID);
            }
        }
        if (childNum) {
            printData.pkgcount = childNum.split(",").length + 1;
        }
        // note = note.replace("{IMAGE}", "<img src='//cdn.kuaidi100.com/images/notes/" + printTempData.company + "/" + printTempData.tempid + "/big.jpg?version=1' />", "g");
        note = printParamReplace(note, printParamData);
        note = printContentReplace(note, printData, printTempData);
        if (childNum) { //打印子单
            var childNumList = childNum.split(",");
            if (printTempData.company != "jd") {
                missionCount++;
                kdPrint.print(printNumReplace(note, printTempData.company, printData.kuaidiNum, null, printData.returnNum, 1, childNumList.length + 1), title, machine, finish);
            }
            for (var i in childNumList) {
                missionCount++;
                kdPrint.print(printNumReplace(note, printTempData.company, printData.kuaidiNum, childNumList[i], printData.returnNum, (parseInt(i) + 2), childNumList.length + 1), title, machine, finish);
            }
        } else {
            missionCount++;
            kdPrint.print(printNumReplace(note, printTempData.company, printData.kuaidiNum, null, printData.returnNum), title, machine, finish);
        }
        if (returnNum) { //打印回单
            var tmpPrintData = printData;
            tmpPrintData.payment = "CONSIGNEE";
            note = printBackTempData.note;
            // note = note.replace("{IMAGE}", "<img src='//cdn.kuaidi100.com/images/notes/" + printTempData.company + "/" + printTempData.tempid + "/big.jpg?version=1' />", "g");
            note = printParamReplace(note, printParamData);
            note = printContentReplace(note, tmpPrintData, printTempData);
            missionCount++;
            kdPrint.print(printNumReplace(note, printTempData.company, returnNum), title, machine, finish);
        }
        finish();
    }

    var printParamReplace = function(note, data) {
        var hasLogo = (typeof(CUSTTYPE) != "undefined" && CUSTTYPE && (CUSTTYPE == "\"\"" || CUSTTYPE == "SNT_CUST")) ? false : true;
        for (var i in data) {
            if (i == "logo") {
                hasLogo = !hasLogo;
            } else if (i == "payment" && (data[i] || data[i] == "")) {
                note = note.replace(/{寄付}/g, data[i]);
                note = note.replace(/{到付}/g, data[i]);
                note = note.replace(/{月结}/g, data[i]);
            } else if (data[i] || data[i] == "") {
                for (var j in printParam) {
                    for (var k in printParam[j].items) {
                        if (k == i) {
                            var reg = new RegExp("{" + printParam[j].items[k] + "}", "g");
                            note = note.replace(reg, data[i]);
                            break;
                        }
                    }
                }
            }
        }
        if (!hasLogo) {
            note = note.replace(/{快递公司logo}/g, "");
        }
        return note;
    };
    //替换对应字段的字体，如果targetStr是没有字体大小设定的目标，那可能会影响别的字段的字体
    var replacePossibleFontSize = function(content, targetStr, fontSize) {
        var reg = new RegExp('(' + targetStr + '.+\n.+\n.+?"FontSize",)[0-9]+');
        return content.replace(reg, '$1' + fontSize);
    };
    //获取字体字号，根据框的大小和字的个数
    var getFontSizeNum = function(width, height, count, lim) {
        var minsize;
        var colNum;
        var rowNum;
        var fontNum = 8;
        var fontSizeMap = [];
        fontSizeMap = [{ fontNum: 8, fontWidth: 13.5, fontHeight: 16 }, { fontNum: 9, fontWidth: 14.5, fontHeight: 17 }, { fontNum: 10, fontWidth: 15.5, fontHeight: 19 },
            { fontNum: 11, fontWidth: 17.5, fontHeight: 19 }, { fontNum: 12, fontWidth: 18.5, fontHeight: 22 }
        ]; //, {fontNum: 7, fontWidth: 11.5, fontHeight: 14}, {fontNum: 13, fontWidth: 19.5, fontHeight: 24}, {fontNum: 14, fontWidth: 21.5, fontHeight:26}

        var i;
        if (lim > 0) {
            i = lim;
        } else {
            i = fontSizeMap.length - 1;
        }
        for (; i >= 0; --i) {
            fontHeight = fontSizeMap[i].fontHeight;
            fontWidth = fontSizeMap[i].fontWidth;
            colNum = Math.floor(width / fontWidth);
            rowNum = Math.floor(height / fontHeight);
            if (colNum * rowNum >= count) {
                fontNum = fontSizeMap[i].fontNum;
                break;
            }
        }
        return fontNum;
    };

    var getStringCount = function(str) {
        if (typeof str !== 'string') {
            str = str + '';
        }
        if (!str) return 0;
        var count = 0;
        for (var i = 0; i < str.length; ++i) {
            var charCode = str.charCodeAt(i);
            if (charCode >= 32 && charCode <= 122) {
                if (charCode >= 65 && charCode <= 90) {
                    count += 0.7;
                } else {
                    count += 0.5;
                }
            } else {
                count += 1;
            }
        }
        // count = Math.floor(count + 0.5);
        return count;
    };

    var resizeToFit = function(content, data, isEle) {
        var resizeList = [
            { str: '{寄件人姓名}', eleSizeLim: 1, count: (data.sendName ? getStringCount(data.sendName) : 0) }, //eleSizeLim，这对应上面那个函数里面的fontSizeMap的下标，用来限定电子面单最大字体为9
            { str: '{寄件人公司名称}', count: (data.sendcompany ? getStringCount(data.sendcompany) : 0) },
            { str: '{寄件地址}', eleSizeLim: 1, count: (data.sendaddr ? getStringCount(data.sendaddr) : 0) },
            { str: '{收件人姓名}', count: (data.recName ? getStringCount(data.recName) : 0) },
            { str: '{收件人公司名称}', count: (data.reccompany ? getStringCount(data.reccompany) : 0) },
            { str: '{收件地址}', count: (data.recaddr ? getStringCount(data.recaddr) : 0) },
            { str: '{物品名称}', count: (data.cargo ? getStringCount(data.cargo) : 0) },
            { str: '{收件人联系电话}', count: (data.recmobile ? getStringCount(data.recmobile) : 0) },
            { str: '{寄件人联系电话}', eleSizeLim: 1, count: (data.sendmobile ? getStringCount(data.sendmobile) : 0) },
            { str: '{收件人邮政编码}', eleSizeLim: 1, count: (data.reczipcode ? getStringCount(data.reczipcode) : 0) },
            { str: '{寄件人邮政编码}', eleSizeLim: 1, count: (data.sendzipcode ? getStringCount(data.sendzipcode) : 0) }        
        ];
        setList = content.split('\n');
        //扫描上面的列表
        for (var i = 0; i < resizeList.length; ++i) {
            //如果列表中的对象的str是空，就说明该字段已经修改完，修改完的字段会设置成空
            if (!resizeList[i].str) continue;
            var currentStr = resizeList[i].str;
            var eleLim = resizeList[i].eleSizeLim || -1; //eleLim用来限制电子面单下这个字段最大字号，注意，如果限制最大字体的下标是0，会出错
            var width;
            var height;
            var sameList = [];
            for (var j = 0; j < setList.length; ++j) {
                if (setList[j].indexOf(resizeList[i].str) != -1) {
                    //找到对应字段后，先看看该字段设置的字体是否在7号或以下
                    var reg = /"FontSize",([0-9]+)/;
                    if (setList[j + 1] && setList[j + 1].indexOf('FontSize') != -1) {
                        var num = parseInt(setList[j + 1].match(reg)[1]);
                        if (num <= 7) {
                            continue;
                        }
                    } else if (setList[j + 2] && setList[j + 2].indexOf('FontSize') != -1) {
                        var num = parseInt(setList[j + 2].match(reg)[1]);
                        if (num <= 7) {
                            continue;
                        }
                    }

                    var currentSetStr = setList[j];
                    reg = new RegExp('LODOP.ADD_PRINT_TEXT\\(-?[0-9]+,-?[0-9]+,([0-9]+),([0-9]+)');
                    var matchResult = currentSetStr.match(reg);
                    width = parseInt(matchResult[1]); //框的长宽
                    height = parseInt(matchResult[2]);
                    reg = new RegExp('{.+?}');
                    sameList = [];
                    matchResult = currentSetStr.match(reg); //重新获取同框所有字段
                    while (matchResult) {
                        sameList.push(matchResult[0]);
                        currentSetStr = currentSetStr.replace(matchResult[0], '');
                        matchResult = currentSetStr.match(reg);
                    }
                    //获取每个字段的内容长度，得到总长
                    var sumLength = 0;
                    for (var k = 0; k < sameList.length; ++k) {
                        for (var l = 0; l < resizeList.length; ++l) {
                            if (sameList[k] === resizeList[l].str) {
                                eleLim = resizeList[l].eleSizeLim || eleLim; //当前字段可能对最大字号没有限制，但可能跟它同框的有限制
                                sumLength += resizeList[l].count;
                                break;
                            }
                        }
                    }
                    var lim = -1; // -1就是不做限制，这个值一定要默认设定
                    if (isEle) {
                        lim = eleLim;
                    }
                    var sizeNum = getFontSizeNum(width, height, sumLength, lim);
                    reg = /("FontSize",)[0-9]+/;
                    if (setList[j + 1] && setList[j + 1].indexOf('FontSize') != -1) {
                        setList[j + 1] = setList[j + 1].replace(reg, '$1' + sizeNum);
                    } else if (setList[j + 2] && setList[j + 2].indexOf('FontSize') != -1) {
                        setList[j + 2] = setList[j + 2].replace(reg, '$1' + sizeNum);
                    }
                }
            }
            //直到整个内容列表都扫描过了，才把设置过的字段置空，因为一个字段可能会在内容列表出现多次
            //最后同框的字段都会被置空，这里假设同框的其它字段不会在别的地方单独出现，这个之后可能要改
            for (var j = 0; j < sameList.length; ++j) {
                for (var k = 0; k < resizeList.length; ++k) {
                    if (resizeList[k].str === sameList[j]) {
                        resizeList[k].str = '';
                    }
                }
            }
        }
        return setList.join('\n');
    };

    var printContentReplace = window.kdPrintBase.printContentReplace = function(content, data, tempData) {
        data.ad = ""; // 付费版去掉广告
        data.ad1 = ""; // 付费版去掉广告
        data.ad2 = ""; // 付费版去掉广告
        data.ad3 = ""; // 付费版去掉广告

        var today = new Date();

        data.sendName = strFilter(data.sendName);
        data.sendcompany = strFilter(data.sendcompany);
        data.sendaddr = strFilter(data.sendaddr2 ? data.sendaddr2 : data.sendaddr);
        data.recName = strFilter(data.recName);
        data.reccompany = strFilter(data.reccompany);
        data.recaddr = strFilter(data.recaddr2 ? data.recaddr2 : data.recaddr);

        var tel = telFormat(data.recmobile);
        data.recmobile = strFilter(tel ? tel : data.recmobile);

        tel = telFormat(data.sendmobile);
        data.sendmobile = strFilter(tel ? tel : data.sendmobile);

        //注意，在调整字号之前，先在上面设置好最后要打印的字段内容
        //调整一些字段的字号，以更好适应字段所在区域
        var isEle = false;
        if (tempData.name && tempData.name.indexOf("电子面单") >= 0) {
            isEle = true;
        }
        content = resizeToFit(content, data, isEle);

        content = content.replace(/{商品名称}/g, data.goodsName);
        content = content.replace(/{寄件人姓名}/g, data.sendName);
        content = content.replace(/{寄件人公司名称}/g, data.sendcompany);
        content = content.replace(/{寄件地址}/g, data.sendaddr); // 改版后sendaddr参数换成sendaddr2

        if (data.sendmobile) {
            tel = telFormat(data.sendmobile);
            content = content.replace(/{寄件人联系电话}/g, data.sendmobile);
            content = content.replace(/{寄件人电话尾号}/g, strFilter(tel ? (tel.split(" ")[2]) : (data.sendmobile.substring(data.sendmobile.length - 4))));
            //有两个电话
            if (data.sendtel && data.sendtel != data.sendmobile) {
                content = content.replace(/{寄件人联系电话2}/g, data.sendtel);
            } else {
                content = content.replace(/{寄件人联系电话2}/g, "");
            }
        } else {
            content = content.replace(/{寄件人联系电话}/g, "");
            content = content.replace(/{寄件人电话尾号}/g, "");
        }
        // content = content.replace(/{寄件人邮政编码}/g, "");
        if (data.sendzipcode) {
            content = content.replace(/{寄件人邮政编码}/g, data.sendzipcode);
        } else {
            content = content.replace(/{寄件人邮政编码}/g, "");
        }


        content = content.replace(/{收件人姓名}/g, data.recName);
        content = content.replace(/{收件人公司名称}/g, data.reccompany);
        content = content.replace(/{收件地址}/g, data.recaddr); // 改版后recaddr参数换成recaddr2

        if (data.recmobile) {
            tel = telFormat(data.recmobile);
            content = content.replace(/{收件人联系电话}/g, data.recmobile);
            content = content.replace(/{收件人电话尾号}/g, strFilter(tel ? (tel.split(" ")[2]) : (data.recmobile.substring(data.recmobile.length - 4))));
            //有两个电话
            if (data.rectel && data.rectel != data.recmobile) {
                content = content.replace(/{收件人联系电话2}/g, data.rectel);
            } else {
                content = content.replace(/{收件人联系电话2}/g, "");
            }
        } else {
            content = content.replace(/{收件人联系电话}/g, "");
            content = content.replace(/{收件人电话尾号}/g, "");
        }
        // content = content.replace(/{收件人邮政编码}/g, "");
        if (data.reczipcode) {
            content = content.replace(/{收件人邮政编码}/g, data.reczipcode);
        } else {
            content = content.replace(/{收件人邮政编码}/g, "");
        }

        content = content.replace(/{物品名称}/g, data.cargo);
        content = content.replace(/{重量}/g, ((data.weight) ? data.weight : ""));
        content = content.replace(/{寄件日期}/g, today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日");

        content = content.replace(/{目的城市}/g, data.reccity);
        content = content.replace(/{始发城市}/g, data.sendcity);

        content = content.replace(/{顶部广告位}/g, data.ad1);
        content = content.replace(/{底部广告位}/g, data.ad);
        content = content.replace(/{电子面单广告1}/g, data.ad2);
        content = content.replace(/{电子面单广告2}/g, data.ad3);

        var isMarket = false;
        var isOpen = false;
        var isSFKill = false; //顺丰特殊处理
        var email = "x@x.net";
        var mktType = "haha";
        var mktCity = "四川";
        if (window.location.href.indexOf("//c.kuaidi100.com") > 0 || (typeof(CUSTTYPE) != "undefined" && CUSTTYPE && CUSTTYPE.indexOf("MKT_CUST") >= 0)) isMarket = true; //超市和子账号
        if (mktType && mktType == "PERSONAL") isOpen = true; //开放超市
        if (isMarket && !isOpen && tempData.company == "shunfeng" && mktCity == "深圳市" && email != "jzhmarket@kingdee.com" && data.sendaddr.indexOf("金蝶") == -1) isSFKill = true; //深圳、顺丰、不是金中环店、寄件地址不带“金蝶”
        if (data.comment) {
            content = content.replace(/{备注}/g, data.comment);
        } else {
            content = content.replace(/{备注}/g, "");
        }

        if (data.payment == "CONSIGNEE") {
            content = content.replace(/{寄付}/g, "");
            content = content.replace(/{到付}/g, "√");
            content = content.replace(/{月结}/g, "");
            content = content.replace(/{付款方式}/g, "到付");
        } else if (isOpen) {
            if (data.payaccount || tempData.payaccount) {
                content = content.replace(/{寄付}/g, "");
                content = content.replace(/{到付}/g, "");
                content = content.replace(/{月结}/g, "√");
                content = content.replace(/{付款方式}/g, "寄付月结");
            } else {
                content = content.replace(/{寄付}/g, "√");
                content = content.replace(/{到付}/g, "");
                content = content.replace(/{月结}/g, "");
                content = content.replace(/{付款方式}/g, "寄方现付");
            }
        } else if (data.payment == "SHIPPER") {
            content = content.replace(/{寄付}/g, "√");
            content = content.replace(/{到付}/g, "");
            content = content.replace(/{月结}/g, "");
            if (tempData.company && tempData.company == "yuantong") {
                content = content.replace(/{付款方式}/g, "√");
            } else {
                content = content.replace(/{付款方式}/g, (isSFKill ? "寄方现付" : (isMarket ? "寄付月结" : "寄付")));
            }
        } else if (data.payment == "MONTHLY") {
            content = content.replace(/{寄付}/g, "");
            content = content.replace(/{到付}/g, "");
            content = content.replace(/{月结}/g, "√");
            content = content.replace(/{付款方式}/g, (isSFKill ? "寄方现付" : (isMarket ? "寄付月结" : "月结")));
        } else {
            content = content.replace(/{寄付}/g, "");
            content = content.replace(/{到付}/g, "");
            content = content.replace(/{月结}/g, "");
            content = content.replace(/{付款方式}/g, "");
        }
        if (data.payment == "MONTHLY") {
            content = content.replace(/{协议}/g, "√");
        } else {
            content = content.replace(/{协议}/g, "");
        }
        if (data.volume) {
            content = content.replace(/{体积}/g, data.volume);
        } else {
            content = content.replace(/{体积}/g, "");
        }
        if (data.transport == "1") {
            content = content.replace(/{汽运}/g, "√");
            content = content.replace(/{空运}/g, "");
        } else if (data.transport == "2") {
            content = content.replace(/{汽运}/g, "");
            content = content.replace(/{空运}/g, "√");
        } else {
            content = content.replace(/{汽运}/g, "");
            content = content.replace(/{空运}/g, "");
        }
        if (data.count) {
            content = content.replace(/{数量}/g, data.count);
        } else {
            content = content.replace(/{数量}/g, "");
        }
        if (data.pkgcount) {
            content = content.replace(/{件数}/g, data.pkgcount);
        } else {
            content = content.replace(/{件数}/g, "");
        }
        if (data.freight) {
            content = content.replace(/{快递费小写}/g, data.freight);
            content = content.replace(/{快递费大写}/g, getDX(data.freight));
        } else {
            content = content.replace(/{快递费小写}/g, "");
            content = content.replace(/{快递费大写}/g, "");
        }
        if (data.valinspay) {
            content = content.replace(/{保价费用}/g, data.valinspay);
        } else {
            content = content.replace(/{保价费用}/g, "");
        }
        if (data.valins) {
            content = content.replace(/{保价金额小写}/g, data.valins);
            content = content.replace(/{保价金额大写}/g, getDX(data.valins));
            content = content.replace(/{保价}/g, "√");
        } else {
            content = content.replace(/{保价金额小写}/g, "");
            content = content.replace(/{保价金额大写}/g, "");
            content = content.replace(/{保价}/g, "");
        }
        if (data.collection) {
            content = content.replace(/{代收货款小写}/g, data.collection);
            content = content.replace(/{代收货款大写}/g, getDX(data.collection));
            content = content.replace(/{代收}/g, "√");
        } else {
            content = content.replace(/{代收货款小写}/g, "");
            content = content.replace(/{代收货款大写}/g, "");
            content = content.replace(/{代收}/g, "");
        }
        if (data.cusprintarea) {
            content = content.replace(/{自定义内容}/g, data.cusprintarea);
        } else {
            content = content.replace(/{自定义内容}/g, "");
        }
        if (data.printbatchno) {
            var printbatch = data.printbatchno.split("-");
            content = content.replace(/{打印批次编号}/g, data.printbatchno);
            content = content.replace(/{打印批次}/g, printbatch[0]);
            content = content.replace(/{打印编号}/g, printbatch[1]);
        } else {
            content = content.replace(/{打印批次编号}/g, "");
            content = content.replace(/{打印批次}/g, "");
            content = content.replace(/{打印编号}/g, "");
        }
        /*电子面单 - 通用*/
        //特殊处理先屏蔽：数字-数字
        // if(data.bulkpen && (!/^\d+\-\d+$/g.test(data.bulkpen))){
        // 	content = content.replace(/{大头笔码}/g, data.bulkpen);
        // }else{
        // 	content = content.replace(/{大头笔码}/g, "");
        // }

        //右上角特殊处理
        if (tempData.name && tempData.name.indexOf("电子面单") >= 0 && tempData.company != "shunfeng" && tempData.company != "ems" && tempData.company != "jd") {
            if (data.payment == "CONSIGNEE" && data.collection) {
                content += "LODOP.ADD_PRINT_SHAPE(4,10,240,140,50,0,1,\"#000000\");";
                content += "LODOP.ADD_PRINT_TEXT(17,247,100,20,\"代收货款\");";
                content += "LODOP.SET_PRINT_STYLEA(0,\"FontColor\",\"#ffffff\");";
                content += "LODOP.SET_PRINT_STYLEA(0,\"FontSize\",12);";
                content += "LODOP.SET_PRINT_STYLEA(0,\"Bold\",1);";
                content += "LODOP.ADD_PRINT_TEXT(37,247,100,20,\"￥" + data.collection + "\");";
                content += "LODOP.SET_PRINT_STYLEA(0,\"FontColor\",\"#ffffff\");";
                content += "LODOP.SET_PRINT_STYLEA(0,\"FontSize\",12);";
                content += "LODOP.SET_PRINT_STYLEA(0,\"Bold\",1);";

                content += "LODOP.ADD_PRINT_TEXT(25,320,60,20,\"到付\");";
                content += "LODOP.SET_PRINT_STYLEA(0,\"Alignment\",2);";
                content += "LODOP.SET_PRINT_STYLEA(0,\"FontColor\",\"#ffffff\");";
                content += "LODOP.SET_PRINT_STYLEA(0,\"FontSize\",14);";
                content += "LODOP.SET_PRINT_STYLEA(0,\"Bold\",1);";
            } else if (data.payment == "CONSIGNEE") {
                content += "LODOP.ADD_PRINT_SHAPE(4,10,280,100,50,0,1,\"#000000\");";
                content += "LODOP.ADD_PRINT_TEXT(25,280,100,20,\"到付\");";
                content += "LODOP.SET_PRINT_STYLEA(0,\"Alignment\",2);";
                content += "LODOP.SET_PRINT_STYLEA(0,\"FontColor\",\"#ffffff\");";
                content += "LODOP.SET_PRINT_STYLEA(0,\"FontSize\",14);";
                content += "LODOP.SET_PRINT_STYLEA(0,\"Bold\",1);";
            } else if (data.collection) {
                content += "LODOP.ADD_PRINT_SHAPE(4,10,280,100,50,0,1,\"#000000\");";
                content += "LODOP.ADD_PRINT_TEXT(17,290,100,20,\"代收货款\");";
                content += "LODOP.SET_PRINT_STYLEA(0,\"FontColor\",\"#ffffff\");";
                content += "LODOP.SET_PRINT_STYLEA(0,\"FontSize\",12);";
                content += "LODOP.SET_PRINT_STYLEA(0,\"Bold\",1);";
                content += "LODOP.ADD_PRINT_TEXT(37,290,100,20,\"￥" + data.collection + "\");";
                content += "LODOP.SET_PRINT_STYLEA(0,\"FontColor\",\"#ffffff\");";
                content += "LODOP.SET_PRINT_STYLEA(0,\"FontSize\",12);";
                content += "LODOP.SET_PRINT_STYLEA(0,\"Bold\",1);";

            }
        }

        if (data.bulkpen) {
            content = content.replace(/{大头笔}/g, data.bulkpen);
            content = content.replace(/{大头笔码}/g, data.bulkpen);
        } else {
            content = content.replace(/{大头笔}/g, "");
            content = content.replace(/{大头笔码}/g, "");
        }
        if (data.recxzq) {
            content = content.replace(/{纸质大头笔}/g, data.recxzq.replace(/#/g, ""));
        } else {
            content = content.replace(/{纸质大头笔}/g, "");
        }

        if (data.orgCode) {
            content = content.replace(/{始发地区域编码}/g, data.orgCode);
        } else {
            content = content.replace(/{始发地区域编码}/g, "");
        }
        if (data.orgName) {
            content = content.replace(/{始发地}/g, data.orgName);
        } else {
            content = content.replace(/{始发地}/g, "");
        }
        if (data.destCode) {
            content = content.replace(/{目的地区域编码}/g, data.destCode);
        } else {
            content = content.replace(/{目的地区域编码}/g, "");
        }
        if (data.destName) {
            content = content.replace(/{目的地}/g, data.destName);
        } else {
            content = content.replace(/{目的地}/g, "");
        }
        if (data.orgSortingCode) {
            content = content.replace(/{始发分拣编码}/g, data.orgSortingCode);
        } else {
            content = content.replace(/{始发分拣编码}/g, "");
        }
        if (data.orgSortingName) {
            content = content.replace(/{始发分拣名称}/g, data.orgSortingName);
        } else {
            content = content.replace(/{始发分拣名称}/g, "");
        }
        if (data.destSortingCode) {
            content = content.replace(/{目的分拣编码}/g, data.destSortingCode);
        } else {
            content = content.replace(/{目的分拣编码}/g, "");
        }
        if (data.destSortingName) {
            content = content.replace(/{目的分拣名称}/g, data.destSortingName);
        } else {
            content = content.replace(/{目的分拣名称}/g, "");
        }
        if (data.orgExtra) {
            content = content.replace(/{始发其他信息}/g, data.orgExtra);
        } else {
            content = content.replace(/{始发其他信息}/g, "");
        }
        if (data.destExtra) {
            content = content.replace(/{目的其他信息}/g, data.destExtra);
        } else {
            content = content.replace(/{目的其他信息}/g, "");
        }
        if (data.pkgCode && data.pkgCode != "null") {
            content = content.replace(/{集包编码}/g, data.pkgCode);
        } else {
            content = content.replace(/LODOP.ADD_PRINT_BARCODE\([^;]+,"\{集包编码\}"\);/g, "");
            content = content.replace(/{集包编码}/g, "");
        }
        if (data.pkgName) {
            content = content.replace(/{集包地名称}/g, data.pkgName);
        } else {
            content = content.replace(/{集包地名称}/g, "");
        }
        if (data.road) {
            content = content.replace(/{路区}/g, data.road);
        } else {
            content = content.replace(/{路区}/g, "");
        }
        if (data.qrCode) {
            content = content.replace(/{二维码}/g, data.qrCode);
        } else {
            content = content.replace(/{二维码}/g, "");
        }
        if (data.orderNum) {
            content = content.replace(/{快递公司订单号}/g, data.orderNum);
        } else {
            content = content.replace(/{快递公司订单号}/g, "");
        }
        if (data.expressCode) {
            content = content.replace(/{业务类型编码}/g, data.expressCode);
        } else {
            content = content.replace(/{业务类型编码}/g, "");
        }
        if (data.expressName) {
            content = content.replace(/{业务类型名称}/g, data.expressName);
        } else {
            content = content.replace(/{业务类型名称}/g, "");
        }
        if (data.checkMan) {
            content = content.replace(/{验视人}/g, data.checkMan);
        } else {
            content = content.replace(/{验视人}/g, "");
        }
        content = content.replace(/{代收货款卡号}/g, "");
        content = content.replace(/{第三方地址}/g, "");

        // for(var i in jsoncom.company){
        // 	if(jsoncom.company[i].code == tempData.company){
        // 		content = content.replace(/{快递公司}/g, jsoncom.company[i].companyname);
        // 		break;
        // 	}
        // }
        // content = content.replace(/{快递公司logo}/g, "<img src='//cdn.kuaidi100.com/images/all/" + tempData.company + "_logo.gif' width='148' height='48' />");
        //更换获取月结账号的地方，从tempData改到data
        if (data.payment == "CONSIGNEE") {
            content = content.replace(/{月结账号}/g, "");
        } else if (data.payaccount) {
            content = content.replace(/{月结账号}/g, (isSFKill ? "" : data.payaccount));
        } else if (tempData.payaccount) {
            content = content.replace(/{月结账号}/g, (isSFKill ? "" : tempData.payaccount));
        } else {
            content = content.replace(/{月结账号}/g, "");
        }
        if (tempData.gotcourier) {
            content = content.replace(/{揽件员}/g, tempData.gotcourier);
        } else {
            content = content.replace(/{揽件员}/g, "");
        }
        content = content.replace(/{字体}/g, "微软雅黑");
        content = content.replace(/null/g, "");
        content = content.replace(/undefined/g, "");
        content = content.replace(/undefine/g, "");
        content = content.replace(/\n/g, " ");
        //console.log(content);
        return content;
    };

    var printNumReplace = function(content, kuaidicom, kuaidinum, childnum, backnum, index, total) {
        if (kuaidinum && (kuaidinum.indexOf("UNKNOWN") < 0)) {
            if (index && total) {
                content = content.replace(/{进度}/g, index + "/" + total);
            } else {
                content = content.replace(/{进度}/g, "");
            }
            if (childnum) {
                if (kuaidicom == "jd") {
                    content = content.replace(/{快递单号}/g, kuaidinum);
                    content = content.replace(/{快递单号条码}/g, kuaidinum);
                    content = content.replace(/{子单号}/g, childnum);
                    content = content.replace(/{母单号}/g, "");
                } else if (kuaidicom == "youshuwuliu") {
                    content = content.replace(/{快递单号}/g, childnum);
                    content = content.replace(/{快递单号条码}/g, childnum);
                    content = content.replace(/{子单号}/g, "");
                    content = content.replace(/{母单号}/g, "主单号：" + kuaidinum + "-" + total + "-" + index);
                } else {
                    content = content.replace(/{快递单号}/g, "");
                    content = content.replace(/{快递单号条码}/g, childnum);
                    content = content.replace(/{子单号}/g, "子单号" + childnum);
                    content = content.replace(/{母单号}/g, "母单号" + kuaidinum);
                }
            } else {
                content = content.replace(/{快递单号}/g, kuaidinum);
                content = content.replace(/{快递单号条码}/g, kuaidinum);
                if (kuaidicom == "jd") {
                    content = content.replace(/{子单号}/g, kuaidinum + "-1-1-");
                } else {
                    content = content.replace(/{子单号}/g, "");
                }
                if (kuaidicom == "youshuwuliu" && total && total > 1) {
                    content = content.replace(/{母单号}/g, "主单号：" + kuaidinum + "-" + total + "-1");
                } else {
                    content = content.replace(/{母单号}/g, "");
                }
            }
            if (backnum) {
                content = content.replace(/{回单单号}/g, backnum);
            } else {
                content = content.replace(/{回单单号}/g, "");
            }
        } else {
            content = content.replace(/{快递单号}/g, "");
            content = content.replace(/{快递单号条码}/g, "");
            content = content.replace(/{子单号}/g, "");
            content = content.replace(/{母单号}/g, "");
            content = content.replace(/{回单单号}/g, "");
        }
        return content;
    };

    var getDX = function(n) {
        var unit = "千百拾亿千百拾万千百拾元角分",
            str = "";
        n += "00";
        var p = n.indexOf('.');
        if (p >= 0)
            n = n.substring(0, p) + n.substr(p + 1, 2);
        unit = unit.substr(unit.length - n.length);
        for (var i = 0; i < n.length; i++)
            str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
        return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
    };

    var telFormat = function(tel) {
        var telMatch = tel.replace(/\D/g, "").match(/1[0-9]{10}/);
        if (telMatch) {
            tel = telMatch[0];
            tel = tel.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
            return tel;
        }
        // if(tel && tel.length == 11 && (tel.substring(0, 1) == "1")){
        // 	tel = tel.replace(/\D/g, "");
        // 	tel = tel.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
        // 	return tel;
        // }
        return false;
    };

    var sqlFilter = function(str, type) {
        if (type == "encode") {
            str = str.replace(/USE/g, "U_S_E");
        } else {
            str = str.replace(/U_S_E/g, "USE");
        }
        return str;
    };

    var strFilter = function(str) {
        if (str) {
            str = str.replace(/"/g, "\\\"");
            str = str.replace(/'/g, "\\\'");
        }
        return str;
    };

    var Obj2str = function(o) {
        if (o == undefined) {
            return "\"\"";
        }
        var r = [];
        if (typeof o == "string") return "\"" + o.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
        if (typeof o == "object") {
            if (!o.sort) {
                for (var i in o)
                    r.push("\"" + i + "\":" + Obj2str(o[i]));
                if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                    r.push("toString:" + o.toString.toString());
                }
                r = "{" + r.join() + "}"
            } else {
                for (var i = 0; i < o.length; i++)
                    r.push(Obj2str(o[i]))
                r = "[" + r.join() + "]";
            }
            return r;
        }
        return o.toString().replace(/\"\:/g, '":""');
    };

    if (typeof define === 'function' && define.amd) {
        define(function() {
            return kdPrintBase;
        });
    } else if (typeof exports !== 'undefined') {
        exports.kdPrintBase = kdPrintBase;
    } else window.kdPrintBase = kdPrintBase;
}(document);
