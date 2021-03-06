$(document).ready(function (){
    $("input[name=unindexed_dataset_data]").focus();
});

function showLink(){
    $(".btn-file-action").hide();
    $("#addNewVersionFormContainer, #fileUploadContainer").parent(".form-group").removeClass("has-error");
    $("#addNewVersionFormContainer, #fileUploadContainer").children("p.help-block").remove();
    $("#addNewVersionFormContainer, #fileUploadContainer").find("div.file-link").remove();
    $("#addNewVersionFormContainer, #fileUploadContainer").append(
        $("<div>", { class: "file-link" }).html(
        $("<input>", { type: "text", class: "form-control", name: "unindexed_dataset_data", placeholder: "eg. http://www.source.com", style: "width: "+width+"; float: left;", required: "" }).add(
        $("<button>", { type: "button", class: "btn btn-danger", style: "margin-left: 5px;", tabindex: "-1", onclick: "hideFileLink(this);" }).html($("<i>", { class: "fa fa-fw fa-times" })))));
    $("#addNewVersionFormContainer, #fileUploadContainer").find("input[name=unindexed_dataset_data]").focus();
}

function hideFileLink(obj){
    $(".btn-file-action").show();
    $(obj).remove();
    $("#addNewVersionFormContainer, #fileUploadContainer").find("div.file-link").remove();
}

function showFileUpload(){
    $(".btn-file-action").hide();
    $("#addNewVersionFormContainer, #fileUploadContainer").parent(".form-group").removeClass("has-error");
    $("#addNewVersionFormContainer, #fileUploadContainer").children("p.help-block").remove();
    $("#addNewVersionFormContainer, #fileUploadContainer").find("div.file-upload").remove();
    $("#addNewVersionFormContainer, #fileUploadContainer").append(
        $("<div>", { class: "input-group file-upload", style: "width: "+width+"; float: left;" }).html(
            $("<span>", { class: "input-group-btn" }).html(
                $("<span>", { class: "btn btn-warning btn-file", text: "Browse…" }).append(
                    $("<input>", { type: "file", name: "file_dataset_data", id: "dataset-data", required: "" }))).add(
            $("<input>", { type: "text", class: "form-control", readonly: "", tabindex: "-1" }))).add(
        $("<button>", { type: "button", class: "btn btn-danger", style: "margin-left: 5px;", tabindex: "-1", onclick: "hideFileUpload(this);" }).html($("<i>", { class: "fa fa-fw fa-times" }))));

    $(document).on('change', '.btn-file :file', function () {
        var input = $(this), numFiles = input.get(0).files ? input.get(0).files.length : 1, label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [
            numFiles,
            label
        ]);
    });

    $('.btn-file :file').on('fileselect', function (event, numFiles, label) {
        console.log("what")
        var input = $(this).parents('.input-group').find(':text'), log = numFiles > 1 ? numFiles + ' files selected' : label;
        if (input.length) {
            input.val(log);
        } else {
            if (log)
                alert(log);
        }
    });
}

function hideFileUpload(obj){
    $(".btn-file-action").show();
    $(obj).remove();
    $("#addNewVersionFormContainer, #fileUploadContainer").find("div.file-upload").remove();
}

$("#fuelux-wizard").submit(function (e){
    $("#fileUploadContainer").parent(".form-group").removeClass("has-error");
    $("#fileUploadContainer").children("p.help-block").remove();
    if($(".file-upload").length == 0 && $(".file-link").length == 0){
        $("#fileUploadContainer").parent(".form-group").addClass("has-error");
        $("#fileUploadContainer").append($("<p>", { class: "help-block", text: "Please select a file or link."}))
        e.preventDefault();
        return
    }
    $(this).find(".form-control").prop("readonly", true);
    $(this).find("button").prop("disabled", true);
    $(this).find("button:submit").prepend($("<i>", {class: "fa fa-fw fa-spin fa-circle-o-notch"}));
});

function uploadNewVersion(obj){
    $("body").append($("<div>", { class: "modal fade", id: "uploadNewResourceModal", "tabindex": "-1", "role": "dialog", "aria-labelledby": "uploadNewResourceModalLabel", "aria-hidden": "true" }).html(
                $("<div>", { class: "modal-dialog" }).html(
                    $("<form>", { class: "form-horizontal", enctype: "multipart/form-data", action: "/resource/" + $(obj).data("resourceid") + "/edit", method: "POST", id: "uploadNewResourceForm" }).html(
                    $("<div>", { class: "modal-content" }).html(
                        $("<div>", { class: "modal-header" }).html(
                            $("<button>", { class: "close", "data-dismiss": "modal", type: "button", "aria-hidden": "true", text: "×" }).add(
                            $("<h3>", { class: "modal-title", id: "uploadNewResourceModalLabel" , text: "Upload New Version"}))
                        ).add(
                            $("<div>", { class: "modal-body" }).html(
                                $("<div>", { class: "form-group form-horizontal" }).html(
                                    $("<label>", { class: "control-label col-sm-3", text: " File"}).prepend(
                                        $("<span>", { class: "text-danger", text: "*" })).add(
                                    $("<div>", { class: "col-sm-8", id: "fileUploadContainer" }).html(
                                        $("<button>", { type: "button", class: "btn btn-sm btn-warning btn-file-action", onclick: "showFileUpload()", text: "FILE"}).add(
                                        $("<button>", { type: "button", class: "btn btn-sm btn-warning btn-file-action", onclick: "showLink()", text: "LINK"}))))).add(
                                $("<div>", { class: "form-group form-horizontal" }).html(
                                    $("<label>", { class: "control-label col-sm-3", "for": "dataset-data-name", text: " Format"}).add(
                                        $("<div>", { class: "col-sm-8", id: "dataset-data-name" }).html(
                                            $("<select>", { class: "form-control", name: "indexed_file_format", id: "dataset-data-format" }).html(
                                        $("<option>", { value: "", selected: "", disabled: "", text: "Select a File Format"}).add(
                                        $("<option>", { value: "CSV", text: "CSV"})).add(
                                        $("<option>", { value: "JSON", text: "JSON"})).add(
                                        $("<option>", { value: "JPG", text: "JPG"})).add(
                                        $("<option>", { value: "PDF", text: "PDF"})).add(
                                        $("<option>", { value: "PNG", text: "PNG"})).add(
                                        $("<option>", { value: "TSV", text: "TSV"})).add(
                                        $("<option>", { value: "XML", text: "XML"})).add(
                                        $("<option>", { value: "XLS", text: "XLS"})).add(
                                        $("<option>", { value: "XLSX", text: "XLSX"})).add(
                                        $("<option>", { value: "ZIP", text: "ZIP"})).add(
                                        $("<option>", { value: "OTHER", text: "OTHER"}))).add(
                                            $("<input>", { type: "hidden", name: "update_resource", value: "1" }))))))
                        ).add(
                            $("<div>", { class: "modal-footer" }).html(
                                $("<button>", { type: "button", "data-dismiss": "modal", class: "btn btn-default", text: "Cancel" }).add(
                                $("<button>", { type: "submit", class: "btn btn-warning", text: " Save Resource" }))))
                        )
                    ))
                )
            ));
    $("#uploadNewResourceModal").modal({ show: true, backdrop: "static", keyboard: false }).on("shown.bs.modal", function (){
        $("#uploadNewResourceForm").submit(function (e){
            $("#fileUploadContainer").parent(".form-group").removeClass("has-error");
            $("#fileUploadContainer").children("p.help-block").remove();
            if($(".file-upload").length == 0 && $(".file-link").length == 0){
                $("#fileUploadContainer").parent(".form-group").addClass("has-error");
                $("#fileUploadContainer").append($("<p>", { class: "help-block", text: "Please select a file or link."}))
                e.preventDefault();
                return
            }
            $(this).find(".form-control").prop("readonly", true);
            $(this).find("button").prop("disabled", true);
            $(this).find("button:submit").prepend($("<i>", {class: "fa fa-fw fa-spin fa-circle-o-notch"}));
        });
    }).on("hidden.bs.modal", function (){
        $(this).remove();
    });
}