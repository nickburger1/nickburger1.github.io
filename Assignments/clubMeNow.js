/* -------------------------------
Functions in this app:
clubDistanceList.html
  loadClubDistances()
  appendTableRows()
  displayClubEntry()
  displayClubDistanceEntryForm(c)
  undoLastShot()
  resetAllClubDistances()
  displayAbout()
  
clubEntry.html
 
  addClub()
  cancelClub()
  
clubDistanceEntry.html
  populateStatsTable()
  appendTapEntryButtons()
    updateStats()
--------------------------------- */


// ----- Functions (clubDistanceList.html) -----


function loadClubDistances() {
	let clubs;
	
	if (localStorage.getItem("clubs")) {
		clubs = JSON.parse(localStorage.getItem("clubs"));
	}
	else {
		clubs = resetAllClubDistances();
		clubs = JSON.parse(localStorage.getItem("clubs"));
	}
	return clubs;
}

function appendTableRows() {
	let tblbody = document.getElementById('clubTable').children[0]; 
	
	for (let i = 0; i < clubs.length; i++) {	
		let row = tblbody.insertRow(i+1); 
		let cell0 = row.insertCell(0); 
		let cell1 = row.insertCell(1); 
		let cell2 = row.insertCell(2); 
		let cell3 = row.insertCell(3); 
		let cell4 = row.insertCell(4); 
		let cell5 = row.insertCell(5); 
		let cell6 = row.insertCell(6); 
		cell0.className = "cmn_hidden"; 
		cell1.className = "cmn_alignRight cmn_fullHeight"; 
		cell2.className = "cmn_alignRight cmn_hidden"; 
		cell3.className = "cmn_alignRight cmn_fullHeight"; 
		cell4.className = "cmn_alignRight cmn_hidden"; 
		cell5.className = ""; 
		cell6.className = "cmn_fullHeight";
		cell0.innerHTML = clubs[i][1]; 
		cell1.innerHTML = Math.round(clubs[i][3]); 
		cell2.innerHTML = Math.round(clubs[i][4]); 
		cell3.innerHTML = Math.round(clubs[i][5]); 
		cell4.innerHTML = Math.round(clubs[i][6]); 
		cell5.innerHTML = "<button class='btn btn-success cmn_noPadding cmn_fullHeight' onclick='displayClubDistanceEntryForm(" + i + ");'>&nbsp;&nbsp;+&nbsp;&nbsp;</button>";
		cell6.innerHTML = clubs[i][2]; 
	}
}

function displayClubEntry() {
	window.location.href = "clubEntry.html"; 
}

function displayClubDistanceEntryForm(c) {
	localStorage.setItem("club", c); 
	window.location.href = "clubDistanceEntry.html"; 
}

function undoLastShot() {
        // your code here !
}

function resetAllClubDistances() {

	let clubs = [
		[ 199, "Dr",  "Driver",   0, 0, 0, 0, 10.5, 230, 200],
		[ 300, "3+w", "3+ wood",  0, 0, 0, 0, 13.5, 210, 180],
		[ 350, "3h",  "3 hybrid", 0, 0, 0, 0, 18.0, 180, 160],
		[ 599, "5i",  "5 iron",   0, 0, 0, 0, 21.0, 160, 140],
		[ 699, "6i",  "6 iron",   0, 0, 0, 0, 24.0, 150, 130],
		[ 799, "7i",  "7 iron",   0, 0, 0, 0, 27.0, 140, 120],
		[ 899, "8i",  "8 iron",   0, 0, 0, 0, 31.5, 130, 110],
		[ 999, "9i",  "9 iron",   0, 0, 0, 0, 36.0, 120, 100],
		[1099, "Pw",  "Pitching", 0, 0, 0, 0, 41.0, 110,  90],
		[1199, "Aw",  "Approach", 0, 0, 0, 0, 46.0, 100,  80],
		[1299, "Gw",  "Gap",      0, 0, 0, 0, 51.0,  90,  70],
		[1399, "Sw",  "Sand",     0, 0, 0, 0, 56.0,  80,  60],
		[1499, "Lw",  "Lob",      0, 0, 0, 0, 60.0,  60,  40],
		[1599, "Ptr", "Putter",   0, 0, 0, 0, 60.0,   3,   3],
	];
	
	let str = JSON.stringify(clubs);
	localStorage.setItem("clubs", str);
	
	window.location.href = "clubDistanceList.html"; 
}

function displayAbout() {
	window.location.href = "clubAbout.html";
}

function displayPenaltyInfo() {
	window.location.href = "clubPenaltyInfo.html";
}

// ----- Functions (clubDistanceEntry.html) -----

function populateStatsTable() {
	document.getElementById('cmn_club').innerHTML = '<strong>' + clubs[clubRow][1] + '</strong>'; 
	document.getElementById('cmn_min').innerHTML = Math.round(clubs[clubRow][4]); 
	document.getElementById('cmn_avg').innerHTML = '<strong>' + Math.round(clubs[clubRow][3]) + '</strong>'; 
	document.getElementById('cmn_max').innerHTML = Math.round(clubs[clubRow][5]); 
	document.getElementById('cmn_num').innerHTML = Math.round(clubs[clubRow][6]);  
}

function appendTapEntryButtons() {
	
	let teDiv = document.getElementById('cmn_tapEntryButtons'); 
	let variation = 30;
	let avgDistPlusSome = Math.round(clubs[clubRow][3] + variation);
	let avgDistMinusSome = Math.max(avgDistPlusSome - 2 * variation, 0);
	
	if (0==Math.round(clubs[clubRow][3])) {
		avgDistPlusSome = 320;
		avgDistMinusSome = 0;
	}
	for (let i = avgDistPlusSome; i > avgDistMinusSome; i -= 5) {
		let btn = document.createElement("span");
		btn.innerHTML = "<button class='cmn_noPadding cmn_fullHeight cmn_tapEntry' onclick='updateStats(" + i + ");'>" + i + "</button> ";
		if(i==Math.round(clubs[clubRow][3])) { 
			btn.innerHTML = "<button class='cmn_noPadding cmn_fullHeight cmn_tapEntry' onclick='updateStats(" + i + ");'><b>" + i + "</b></button> ";
			btn.className = 'cmn_green';
		}
		teDiv.appendChild(btn); 
	}
}


function updateStats(shotDistance=0) {

	if(shotDistance==0)
		shotDistance = parseInt(document.getElementById('clubVal').value);
	if(parseInt(shotDistance) > 0) {
		let str = JSON.stringify(clubs);
		localStorage.setItem("clubsUndo", str);
		currentAverage = clubs[clubRow][3];
		currentNumShots = clubs[clubRow][6];
		newAverage = (currentAverage * currentNumShots + shotDistance) 
			/ (currentNumShots + 1);
		clubs[clubRow][3] = newAverage;
		clubs[clubRow][6] += 1;
		if (clubs[clubRow][4]==0 
			|| shotDistance < clubs[clubRow][4]) clubs[clubRow][4] = shotDistance;
		if (clubs[clubRow][5]==0 
			|| shotDistance > clubs[clubRow][5]) clubs[clubRow][5] = shotDistance;
		str = JSON.stringify(clubs);
		localStorage.setItem("clubs", str);
		window.location.href = "clubDistanceList.html"; 
	}
}
