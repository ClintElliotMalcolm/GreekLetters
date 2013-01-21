(function () {
	var alphabet;
	var needToTestAlphabet;
	var letter;
	var testingText;
	var letterVals = {
		"alpha" : "Α",
		"beta" : "Β",
		"gamma" : "Γ",
		"delta" : "Δ",
		"epsilon" : "Ε",
		"zeta" : "Ζ",
		"eta" : "Η",
		"theta" : "Θ",
		"iota" : "Ι",
		"kappa" : "Κ",
		"lambda" : "Λ",
		"mu" : "Μ",
		"nu" : "Ν",
		"xi" : "Ξ",
		"omicron" : "Ο",
		"pi" : "Π",
		"rho" : "Ρ",
		"sigma" : "Σ",
		"tau" : "Τ",
		"upsilon" : "Υ",
		"phi" : "Φ",
		"chi" : "Χ",
		"psi" : "Ψ",
		"omega" : "Ω"};
	
	$(document).ready(setup);
		
	function setup() {
		$("#next").click( function () { 
				if(testingText) {
					testText();
				} else {
					testImage();
				}
			});
		alphabet = ["alpha","beta","gamma","delta","epsilon","zeta","eta","theta",
		"iota","kappa","lambda","mu","nu","xi","omicron","pi","rho","sigma","tau",
		"upsilon","phi","chi","psi","omega"];
		needToTestAlphabet = alphabet.slice(0);
		$("#symbT").click(testImage);
		$("#textT").click(testText);
		$("#orderT").click(testOrder);
	}
		
	function testText () {
		testingText = true;
		if(needToTestAlphabet.length == 0) {
			needToTestAlphabet = alphabet.slice();
		}
		var index = Math.floor(Math.random()*needToTestAlphabet.length);
		letter = needToTestAlphabet[index];
		$("#test").html("");
		var letterView = $("<div>", {
				"id" : "letter"
			});
		letterView.html(letterVals[letter]);
		var input = $("<input>", {
				"type" : "text",
				"id" : "textIn"
			});
		input.keyup(function () {
				if($("#textIn").val() != letter) {
					$("#textIn").css("background-color", "#FF6969");
				} else {
					$("#textIn").css("background-color", "#7AFF69");
					needToTestAlphabet = removeElement(needToTestAlphabet, letter);
				}
			});
		$("#test").append(letterView);
		$("#test").append(input);
	}
	
	function removeElement(array, element) {
		var index = array.indexOf(element);
		return removeIndex(array, index);
	}
	
	function removeIndex(array, index) {
		if(index != -1) {
			var rest = array.slice(index + 1);
			array = array.slice(0,index);
			array.push.apply(array, rest);
		}
		return array;
	}
	
	function shuffle(o){ //v1.0
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
	};
	
	function testImage () {
		testingText = false;
		if(needToTestAlphabet.length == 0) {
			needToTestAlphabet = alphabet.slice(0);
		}
		var index = Math.floor(Math.random()*needToTestAlphabet.length);
		letter = needToTestAlphabet[index];
		$("#test").html("");
		var letterView = $("<div>", {
				"id" : "word"
			});
		letterView.html(letter);
		var optionLetters = [letterVals[letter]];
		var alphabetCopy = alphabet.slice(0);
		alphabetCopy = removeElement(alphabetCopy, letter);
		$("#test").append(letterView);
		for(var i = 0; i < 3; i++) {
			var selectIndex = Math.floor(Math.random()*alphabetCopy.length);
			optionLetters.push(letterVals[alphabetCopy[selectIndex]]);
			alphabetCopy = removeIndex(alphabetCopy, selectIndex);
		}
		shuffle(optionLetters);
		var form = $("<form>",{});
		for(var i = 0; i < 4; i++) {
			var potential = $("<input>",{
					"type" : "radio",
					"name" : "symbol",
					"id" : optionLetters[i],
					"value" : optionLetters[i],
					"class" : "symbol"});
			potential.html(optionLetters[i]);
			potential.change(function () {
					if($(this).val() != letterVals[letter]) {
						$(this).next().css("background-color", "#FF6969");
					} else {
						$(this).next().css("background-color", "#7AFF69");
						needToTestAlphabet = removeElement(needToTestAlphabet, letter);
					}
				});
			var label = $("<label>", {
					"for": optionLetters[i]
				});
			label.html(optionLetters[i]);
			form.append(potential);
			form.append(label);
		}
		$("#test").append(form);
					
	}
	
	function testOrder () {
		var alphabetCopy = alphabet.slice(0);
		//alphabetCopy = shuffle(alphabetCopy);
		var list = $("<ul>", {
				"id" : "alphabet"
			});
		for(var i = 0; i < alphabetCopy.length; i++) {
			var li = $("<li>",{
					"class":"ui-state-default"
				});
			li.html(alphabetCopy[i]);
			list.append(li);
		}
		$("#test").html("");
		$("#test").append(list);
		$("#alphabet").sortable({
				update: function(event, ui) {
					if($("li") == alphabet) {
						$("#alphabet").css("background-color","#7AFF69");
					}
				}
			});
	}
})();