/* report-viewer-webpart loading progress bar */
function addReportViewerLoadingBar(sender) {
	var prm = Sys.WebForms.PageRequestManager.getInstance();
    if (!prm.get_isInAsyncPostBack()) {
        prm.add_endRequest(EndRequest)
    }
}


function EndRequest(sender, args) {
	/* for mobile */
    //var reportViewerControlId = "ReportViewerCSU";
	
	/* for main */
	/*var reportViewerControlId = [ "WebPartAdder", "ReportViewer" ];*/
	
	// put your ReportViewer name here
	var reportViewerControlId = [ "ReportViewer" ];
    
	/* adding showLoadingBar to 'show report' button
     * when its become active. After click report starting
	 * to render and it takes some time. Spinner show at that time
     */
    $("input:submit.btnCustomList").click(function(e) {
		ShowLoadingBar();		
	});
	
	if(sender._postBackControlClientIDs[0] == undefined)
		return

	var isReportViewerPostback = false;
	
	$.each(sender._postBackControlClientIDs, function(srcIndex, srcValue) {
		$.each(reportViewerControlId, function(findIndex, findValue) {
			if(srcValue.indexOf(findValue) >= 0) {
				isReportViewerPostback = true;
				return false;
			}
		});
		if(isReportViewerPostback)
			return false;		
	});
		
    if (isReportViewerPostback) {
    	HideLoadingBar();
    }
}

function ShowLoadingBar() {
	var $preloader = jQuery('.model-9'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeIn();
    $preloader.delay(350).fadeIn('slow');
}

function HideLoadingBar() {
	var $preloader = jQuery('.model-9'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
}