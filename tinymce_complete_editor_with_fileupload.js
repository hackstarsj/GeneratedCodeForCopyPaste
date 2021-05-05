/*------------------------------------------------------------------------------------BASIC SETTINGS------------------------------------------------------------------------
//
// 1. ADD THIS in YOUR HTML PAGE
//<script src="//cdn.tiny.cloud/1/u6oa5pnpaa1vxho1md7uk4zmq2ai7xuf5o5wfgyrc131vpj6/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script> 
//
// 2. PLACE_YOUR_ID with Your TextArea ID  
//                                                                                                                                   
// 3. CREATE A URL IN BACKEND and Replace With SERVER_URL And Access File By 'file' KEY
//    and Return Response in JSON " {"location":"RETURN IMAGE URL IN RESPONSE OF THIS URL"}" 
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
tinymce.init({
        selector: "textarea#PLACE_YOUR_ID",
        height: 300,
        plugins: [
            "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime nonbreaking",
            "save table contextmenu directionality emoticons template paste textcolor",
        ],
        images_upload_url:"SERVER_URL",
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons",
        style_formats: [
            { title: "Bold text", inline: "b" },
            { title: "Red text", inline: "span", styles: { color: "#ff0000" } },
            { title: "Red header", block: "h1", styles: { color: "#ff0000" } },
            { title: "Example 1", inline: "span", classes: "example1" },
            { title: "Example 2", inline: "span", classes: "example2" },
            { title: "Table styles" },
            { title: "Table row 1", selector: "tr", classes: "tablerow1" },
        ],
        automatic_uploads: true,
        file_picker_types: 'image',
        file_picker_callback: function (cb, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        /*
        Note: In modern browsers input[type="file"] is functional without
        even adding it to the DOM, but that might not be the case in some older
        or quirky browsers like IE, so you might want to add it to the DOM
        just in case, and visually hide it. And do not forget do remove it
        once you do not need it anymore.
        */

        input.onchange = function () {
        var file = this.files[0];

        var reader = new FileReader();
        reader.onload = function () {
            /*
            Note: Now we need to register the blob in TinyMCEs image blob
            registry. In the next release this part hopefully won't be
            necessary, as we are looking to handle it internally.
            */
            var id = 'blobid' + (new Date()).getTime();
            var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
            var base64 = reader.result.split(',')[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);

            /* call the callback and populate the Title field with the file name */
            cb(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsDataURL(file);
        };

        input.click();
    },
});