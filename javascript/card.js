const { Console } = require('console');
const { ipcRenderer } = require('electron');
const { parseJSON } = require('jquery');
const process = require('process');


$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({
        trigger : 'hover'
    });
    $('[data-toggle="tooltip"]').on('click', function () {
        $(this).tooltip('dispose');
    });
    var actions = $("table td:last-child").html();
    // Append table with add row form on add new button click
    $(".add-new").click(function(){
        $(this).attr("disabled", "disabled");
        var index = $("table tbody tr:last-child").index();

        var newId = getAvailableId();        
        
        if(newId === null){  
            $("table tbody").html("");   
            index = -1;
            newId = 1;
            actions = '<a class="add" title="Adicionar" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
                      '<a href="#" class="edit" title="Editar" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
                      '<a href="#" class="delete" title="Deletar" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' ;     
        }    

        var row =   '<tr class="table-secondary">' +
                        '<td>'+newId+'</td>' +
                        '<td><input type="text" style="text-transform: uppercase" class="form-control newUser" name="nome" id="nome"></td>' +
                        '<td>' + actions + '</td>' +
                    '</tr>';
        $("table").append(row);		
        $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip({
            trigger : 'hover'
        }); 

        $(".newUser").focus();     

        $( ".newUser" ).keyup(function( event ) {        
            if (event.key === 'Enter' && $( ".newUser" ).val().trim() !== "") {
                var add_clicked = $(this).parents("tr").find('.add');
                add_clicked.click();
                
                $(".add-new").click();
            }
        }); 
    });
    // Add row on add button click
    $(document).on("click", ".add", function(){
        var empty = false;
        var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function(){
            if(!$(this).val()){
                $(this).addClass("error");
                empty = true;
            } else{
                $(this).removeClass("error");
            }
        });
        $(this).parents("tr").find(".error").first().focus();
        if(!empty){
            input.each(function(){
                if(userUpdated != $(this).val().trim()){
                    id = $(this).parents("tr").find("td:first-child").text();
                    userName= $(this).val().toUpperCase().trim();
                    rc = data.updateUser(id, userName);
                   
                    if(rc == 1){
                        $(".alert-success").html(`Usuário ${userName} alterado com sucesso`);
                        $(".alert-success").show().delay(5000).fadeOut();
                        $(this).parent("td").html($(this).val().toUpperCase());
                        loadUserPage();
                    }else if(rc == 2){
                        $(".alert-success").html(`Usuário ${userName} criado com sucesso`);
                        $(".alert-success").show().delay(5000).fadeOut();
                        $(this).parent("td").html($(this).val().toUpperCase());
                        loadUserPage(0, 'insert');                     
                    }else if(rc == 9){
                        $(".alert-danger").html(`Usuário ${userName} já existe`);
                        $(".alert-danger").show().delay(5000).fadeOut();
                        $(this).parent("td").html(userUpdated);
                        $(".table-secondary").remove();
                    }else{
                        $(this).parent("td").html($(this).val().toUpperCase());
                    }
                }
            });			
            $(this).parents("tr").find(".add, .edit").toggle();
            $(".add-new").removeAttr("disabled");
        }
        
    });
    // Edit row on edit button click
    $(document).on("click", ".edit", function(){	
        $(this).parents("tr").find("td:not(:last-child, :first-child)").each(function(){
            userUpdated = $(this).text().trim();	
            $(this).html('<input type="text" class="form-control updateUser" style="text-transform: uppercase" value="' + $(this).text() + '">');
            
            $( ".updateUser" ).keyup(function( event ) {        
                if (event.key === 'Enter') {
                    var update_clicked = $(this).parents("tr").find('.add');
                    update_clicked.click();
                }
            }); 
        });	
        $(".updateUser").focus();  	
        $(this).parents("tr").find(".add, .edit").toggle();
        $(".add-new").attr("disabled", "disabled");
    });
    // Delete row on delete button click
    $(document).on("click", ".delete", function(){
        let id = $(this).parents("tr").find("td:first-child").text();
        let name = $(this).parents("tr").find("td:nth-child(2)").text();

        data.deleteUser(id);

        loadUserPage();
        $(".alert-success").html(`Usuário ${name} excluido com sucesso`);
        $(".alert-success").show().delay(5000).fadeOut();

        $(this).parents("tr").remove();
        $(".add-new").removeAttr("disabled");

        var trRows = $("table tbody tr:last-child").index();
        
        if(trRows == -1){
            var row =   '<tr>' +
                            '<td colspan="3" class="text-center">Nenhum usuário encontrado</td>'  +
                        '</tr>';
    
            $("table").append(row);
        }
        
    });

    $( ".user-search" ).keyup(function( event ) {        
        loadUserPage();        
    }); 
       
});