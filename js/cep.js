 
    function limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
        document.getElementById('rua').value=("");
        document.getElementById('bairro').value=("");
        document.getElementById('cidade').value=("");
        document.getElementById('uf').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('uf').value=(conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}
    
function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('cidade').value="...";
            document.getElementById('uf').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

function valida_nome() {
    var filter_nome = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/;
    if (!filter_nome.test(document.getElementById("input_nome").value)) {
        document.getElementById("input_nome").value = '';
        document.getElementById("input_nome").placeholder = "Coloque um nome valido !";
        document.getElementById("input_nome").style.borderColor = "#ff0000";
        document.getElementById("input_nome").style.outline = "#ff0000";
        document.getElementById("input_nome").focus();
        document.getElementById("input_nome").onkeydown = function keydown_nome() {
            document.getElementById("input_nome").placeholder = "";
            document.getElementById("input_nome").style.borderColor = "#999999";
            document.getElementById("input_nome").style.outline = null;
        }
        return false;
    } 
    return true
    }

    $(document).ready(function(){
        $('body').on('focus', '.tel', function(){
            var maskBehavior = function (val) {
                return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
            },
            options = {
                onKeyPress: function(val, e, field, options) {
                    field.mask(maskBehavior.apply({}, arguments), options);
    
                    if(field[0].value.length >= 14){
                        var val = field[0].value.replace(/\D/g, '');
                        if(/\d\d(\d)\1{7,8}/.test(val)){
                            field[0].value = '';
                            alert('Telefone Invalido');
                        }
                    }
                }
            };
            $(this).mask(maskBehavior, options);
        });
    });