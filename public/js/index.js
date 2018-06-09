var files;

$(function() {
    $.get('./server/examples_tree.php', function(response) {
        if (response.success) {
            files = response.data.dump;

            $('#files_gui').tree({
                data: files,
                autoOpen: true,
                openedIcon: '-',
                closedIcon: '+'
            });
        } else {
            alert(response.reason || 'Unknown error occurred!');
        }
    });
});

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

function search(search_term) {
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