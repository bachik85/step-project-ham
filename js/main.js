// ********************************** Services tabs ***************************************************

$('#tabs').click((e) => {
    $(".tabs-title.active").removeClass("active");
    $(e.target).addClass("active");
    $('#tabsContent li').removeClass("active");
    $(`#tabsContent li[data-content=${e.target.dataset.content}]`).addClass("active");
});

//******************************** Our Amazing work tabs **********************************************

function imgLoad(category, n, dest) {
    let img = new Image();
    img.onload = () => {
        let container = document.createElement('div');
        $(container).addClass('work');
        container.innerHTML = `
			<img src="img/${category}/${category}${n}.jpg" alt="picture" class="work-img">
			<div class="work-card">
			    <div class="icons-box">
                    <a class="link-icon" href="#"><i class="fas fa-link"></i></a>
                    <a href="#"><i class="fas fa-square"></i></a>
                </div>
				<h5>Creative design</h5>
				<p>${category.split('-').join(" ")}</p>
			</div>`;
        $(dest).append(container);
    }
    img.onerror = () => $("#loadBtn").hide();
    img.src = `./img/${category}/${category}${n}.jpg`
}

let imgIndex = 1;

function imgPack(category, dest) {
    let dir = category.data("title");
    if (dir == "all") {
        let categories = [];
        for (let i = 0; i < category.siblings().length; i++) {
            categories.push($(category.siblings()[i]).data("title"));
        }
        for (let i = 0; i < 12; i++) {
            imgLoad(categories[i % categories.length], imgIndex, ".works");
            if ((i + 1) % categories.length == 0)
                imgIndex++;
        }
    } else {
        for (let i = 0; i < 12; i++) {
            imgLoad(dir, imgIndex, dest);
            imgIndex++;
        }
    }
}

imgPack($('.category.active'), ".works");

$('#categories').on("click", "li", function (e) {
    $(".category.active").removeClass("active");
    $(this).addClass("active");
    $(".works").html("");
    imgIndex = 1;
    $('#loadBtn').show();
    imgPack($(this), ".works");
})

//***************************************** Button LOAD MORE *********************************************************

$('#loadBtn').click(function () {
    imgPack($('.category.active'), ".works");
    $(this).hide();
})
//******************************************* Peoples slider ***********************************************************

let slideWidth = $(".person").first().width();

$('#carTabs').on("click", ".img-btn", function () {
    $(".img-btn.active").removeClass("active");
    $(this).addClass("active");
    $(".people").animate({
        left: - $(".img-btn.active").data("index") * slideWidth
    }, 800);
})

$('#carTabs').on("click", ".next-btn", function () {
    let curr = $(".img-btn.active").removeClass("active");
    if ($(this).attr("id") == "rightBtn") {
        if (curr.is($(".img-btn").last())) {
            $(".img-btn").first().addClass("active");
        } else {
            curr.next().addClass("active");
        }
    } else {
        if (curr.is($(".img-btn").first())) {
            $(".img-btn").last().addClass("active");
        } else {
            curr.prev().addClass("active");
        }
    }
    $(".people").animate({
        left: - $(".img-btn.active").data("index") * slideWidth
    }, 800);
})