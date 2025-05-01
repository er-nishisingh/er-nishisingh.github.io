function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const strTime = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const strDate = now.toLocaleDateString("en-GB", options);
  $(".time").text(strTime);
  $(".date").text(strDate);
}

function calculateMonths(element) {
  const start = $(element).data("start");
  const end = $(element).data("end");
  var startDate = new Date(start);
  var endDate = end === "present" ? new Date() : new Date(end);

  var monthsDifference =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const yrDiff = parseInt(monthsDifference / 12);
  const monDiff = (monthsDifference % 12) + 1;

  $(element).text(
    $(element).text() +
      (yrDiff > 0 ? yrDiff + " yrs" : "") +
      " " +
      (monDiff && monDiff + " months")
  );
}

$(document).ready(function () {
  $(".darkmode label").click(function () {
    $(document.body).toggleClass("dark");
  });

  setInterval(updateClock, 1000);
  updateClock();

  $(".duration").each(function (index, element) {
    calculateMonths(element);
  });

  $("nav ul li").click(function (e) {
    $("nav ul li span").css("display", "none");
    $(`nav ul li.${e.target.classList.value.split(" ")[0]} span`).css(
      "display",
      "block"
    );
    $("html, body").animate(
      {
        scrollTop:
          $(`.container #${e.target.classList.value.split(" ")[0]}`).offset()
            .top - 150,
      },
      "slow"
    );
  });

  $(window).scroll(function () {
    var allNavLi = [];
    $("nav li").each(function () {
      allNavLi.push($(this).attr("class").split(" ")[0]);
    });

    for (let i = 0; i < allNavLi.length; i++) {
      if ($(window).scrollTop() >= $(`#${allNavLi[i]}`).offset().top - 500) {
        $("nav ul li span").css("display", "none");
        $(`nav ul li.${allNavLi[i]} span`).css("display", "block");
      }
    }
  });

  $(".links img").click(function (e) {
    window.open(
      e.target.alt === "gmail"
        ? "mailto:er.singh.nishi@gmail.com"
        : "https://www.linkedin.com/in/its-nishi-singh"
    );
  });

  $("footer .curr_yr").text(" " + new Date().getFullYear());
});

document.addEventListener("contextmenu", (e) => e.preventDefault());
function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, "I") ||
    ctrlShiftKey(e, "J") ||
    ctrlShiftKey(e, "C") ||
    (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
  )
    return false;
};
