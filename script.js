var defaultBg = "ffffff";

var lastInput = "";
var lastBg = "ffffff";

window.onload = () => {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) defaultBg = "242424";
	document.getElementById("bg").placeholder = defaultBg;

	const element = document.getElementById("result");
	
	setInterval(() => {
		const input = document.getElementById("input").value;
		if (lastInput != input) {
			lastInput = input;
		
			katex.render(input, element, {
				throwOnError: false
			});
		}
	
		const bg = document.getElementById("bg").value || defaultBg;
		if (lastBg != bg) {
			lastBg = bg;
			const color = tinycolor(bg);
			if (!color.isValid()) {
				document.getElementById("bg").style.backgroundColor = "#ff0000";
			} else {
				setFgBg(document.body, color);
				setFgBg(document.getElementById("input"), color);
				setFgBg(document.getElementById("bg"), color);
				setFgBg(document.getElementById("info"), color);
			}
		}
	}, 1000);
	
	element.onclick = () => {
		html2canvas(element, { backgroundColor: tinycolor(lastBg).toHexString(), height: element.clientHeight + 10 }).then(canvas => {
			canvas.toBlob(blob => {
				const item = new ClipboardItem({ "image/png": blob });
				navigator.clipboard.write([item]);
				alert("Copied KaTeX output to clipboard!");
			})
		});
	}

	document.getElementById("info-button").onclick = () => {
		const info = document.getElementById("info");
		if (info.classList.contains("hidden")) info.classList.remove("hidden");
		else info.classList.add("hidden");
	}
}

function setFgBg(element, color) {
	element.style.backgroundColor = color.toHexString();
	if (color.isDark()) element.style.color = "#ffffff";
	else element.style.color = "#000000";
}