export function scrollTop(scroll_top = 0) {
  let scrollToptimer = setInterval(() => {
    console.log("定时循环回到顶部")
    let top = document.body.scrollTop || document.documentElement.scrollTop;
    let speed = top / 4;
    if (document.body.scrollTop !== 0) {
      document.body.scrollTop -= speed;
    } else {
      document.documentElement.scrollTop -= speed;
    }
    if (top < scroll_top) {
      clearInterval(scrollToptimer);
    }
  }, 30);
}
