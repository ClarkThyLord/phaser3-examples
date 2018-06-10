var examples, editor;

$(function() {
    content_switch('about');
    $.get('./server/examples_tree.php', function(response) {
        if (response.success) {
            examples = response.data.dump;

            $('#examples_gui').tree({
                data: examples,
                autoOpen: true,
                openedIcon: '-',
                closedIcon: '+'
            }).on('tree.select',
                function(event) {
                    // TODO Load selected example
                    console.log(event.node);
                });
        } else {
            alert(response.reason || 'Unknown error occurred!');
        }
    });

    editor = ace.edit("editor_gui");
});


/**
 * Toggle the view of the sidebar on and off.
 * @return {undefined} Returns nothing.
 */
function toggle_sidemenu() {
    if ($('#sidebar').attr('data-state') === 'false') {
        $('#sidebar').attr("style", "display: block !important;").css({
            width: 250
        });
        $('main').css({
            marginLeft: 250
        });
        $('#sidebar').attr('data-state', 'true');
    } else {
        $('#sidebar').css({
            width: 0
        });
        $('main').css({
            marginLeft: 0
        });
        $('#sidebar').attr('data-state', 'false');
    }
}


/**
 * Switch to a content's view, given it's identifier.
 * @param {String} identifier Identifier of content to switch to.
 * @param {String} identifier Options to use on content switch.
 * @return {undefined} Returns nothing.
 */
function content_switch(identifier, options) {
    if (identifier === 'about') {
        $('main').hide();
        $('main#about').show();
    } else if (identifier === 'preview') {
        $('main').hide();
        $('main#preview').show();
    } else if (identifier === 'editor') {
        $('main').hide();
        $('main#editor').show();
    }
}


/**
 * Search for a file, given a search term String.
 * @param {String} search_term Search term used to find file.
 * @return {undefined} Returns nothing.
 */
function example_search(search_term) {
    if (!search_term || search_term === '') {
        $('.jqtree-element[role="presentation"]').show();
    } else {
        $('.jqtree-element[role="presentation"]').each(function functionName() {
            if ($(this).text().toLowerCase().indexOf(search_term.toLowerCase()) !== -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
}


/**
 * Picks a random example to view.
 * @return {undefined} Returns nothing.
 */
function example_random() {

}