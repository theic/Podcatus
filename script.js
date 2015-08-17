// banners removal
var banners = document.getElementsByClassName('banner_container');
for (var j = 0; j < banners.length; j++) {
	banners[j].innerHTML = "";
}

if (document.URL.indexOf(".html") == -1) {
	var elements = getAllElementsWithAttribute('valign', 'top');
	for (var i = 0; i < elements.length; i++) {
		var article = elements[i].getElementsByClassName('entry')[0];
		if (article == null) { continue; }
		var title = article.getElementsByClassName('subject')[0];
		var tags = article.getElementsByTagName('p')[0].innerText;
		// remove all adverts
		if (tags.indexOf('реклама') > -1
				|| tags.indexOf('постпроплачен') > -1
				|| tags.indexOf('триста') > -1) {
			article.innerHTML = "Deleted.";
			continue;
		}
		// spoiler
		var pos = 0, count = 0, len = article.innerHTML.indexOf('<div');
		while(count < 5){
			var p = article.innerHTML.indexOf('<br>', pos);
			if (p < 0) { 
				break; 
			} else {
				count++;
				pos = p + 4;
			}
		}
		var actualContent = article.innerHTML.substr(0, len);
		if (pos < len) {
			actualContent = article.innerHTML.substr(0, pos);
			title.getElementsByTagName('a')[0].innerHTML = "Читать дальше..."
			actualContent += title.innerHTML;
		}
		article.innerHTML = actualContent;
	}
}

function getAllElementsWithAttribute(attribute, value) {
    var matchingElements = [];
    var allElements = document.getElementsByTagName('*');
    for (var i = 0, n = allElements.length; i < n; i++) {
		if (allElements[i].getAttribute(attribute) == value) {
			matchingElements.push(allElements[i]);
		}
	}
	return matchingElements;
}