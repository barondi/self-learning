/**
 * Created by dijs1 on 2016/10/20.
 * 插件说明：滚动到最底部自动加载100条
 */
(function ($) {
    var pos = 0;
    var LIST_ITEM_SIZE = 100;
    createListItems();
    $(document).ready(function () {
        $('.parent_div').scroll(function () {
            var currentObj = $('.parent_div')[0];
            //当前窗口的高度
            var objHeight = currentObj.clientHeight;
            console.log("current Obj height is " + objHeight);
            //当前滚动条从上往下滚动的距离
            var scrollTop = currentObj.scrollTop;
            console.log("current scrollTop is " + scrollTop);
            //当前文档的高度
            var scrollHeight = currentObj.scrollHeight;
            console.log("current scrollHeight is " + scrollHeight);
            console.log(objHeight+'||'+scrollTop+'||'+scrollHeight);
        //计算公式：(滚动条滚动的距离 + 窗口的高度 = 文档的高度)
            if (scrollTop >= scrollHeight - objHeight) {
                console.log('new')
                createListItems();
            }
        });
    });

    function createListItems() {
        var mydocument = document;
        var mylist = mydocument.getElementById("my_list");
        var docFragments = mydocument.createDocumentFragment();
        for (var i = pos; i < pos + LIST_ITEM_SIZE; ++i) {
            var liItem = mydocument.createElement("li");
            liItem.innerHTML = "This is item " + i;
            docFragments.appendChild(liItem);
        }
        pos += LIST_ITEM_SIZE;
        mylist.appendChild(docFragments);
    }
})(jQuery);