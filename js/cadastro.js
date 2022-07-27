 
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
        document.getElementById("input_nome").placeholder = "Use apenas letras !";
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

    function valida_sobrenome() {
        var filter_nome = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/;
        if (!filter_nome.test(document.getElementById("input_sobrenome").value)) {
            document.getElementById("input_sobrenome").value = '';
            document.getElementById("input_sobrenome").placeholder = "Use apenas letras !";
            document.getElementById("input_sobrenome").style.borderColor = "#ff0000";
            document.getElementById("input_sobrenome").style.outline = "#ff0000";
            document.getElementById("input_sobrenome").focus();
            document.getElementById("input_sobrenome").onkeydown = function keydown_nome() {
                document.getElementById("input_sobrenome").placeholder = "";
                document.getElementById("input_sobrenome").style.borderColor = "#999999";
                document.getElementById("input_sobrenome").style.outline = null;
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

    function validadata(){
        var data = document.getElementById("nascimento").value; // pega o valor do input
        data = data.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
        var data_array = data.split("-"); // quebra a data em array
        
        // para o IE onde será inserido no formato dd/MM/yyyy
        if(data_array[0].length != 4){
           data = data_array[2]+"-"+data_array[1]+"-"+data_array[0]; // remonto a data no formato yyyy/MM/dd
        }
        
        // comparo as datas e calculo a idade
        var hoje = new Date();
        var nasc  = new Date(data);
        var idade = hoje.getFullYear() - nasc.getFullYear();
        var m = hoje.getMonth() - nasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
        
        if(idade < 18){
           alert("Pessoas menores de 18 não podem se cadastrar.");
           document.getElementById("nascimento").value = "";
           document.getElementById("nascimento").style.borderColor = "#ff0000";
           document.getElementById("nascimento").style.outline = "#ff0000";
           document.getElementById("nascimento").focus();
           document.getElementById("nascimento").onkeydown = function keydown_nome() {
               document.getElementById("nascimento").style.borderColor = "#999999";
               document.getElementById("nascimento").style.outline = null;
           }
           return false;
        }
     
        if(idade >= 18 && idade <= 100){
           return true;
        }

        if(idade >= 100){
            alert("Digite uma idade valida")
            document.getElementById("nascimento").value = "";
            document.getElementById("nascimento").style.borderColor = "#ff0000";
            document.getElementById("nascimento").style.outline = "#ff0000";
            document.getElementById("nascimento").focus();
            document.getElementById("nascimento").onkeydown = function keydown_nome() {
                document.getElementById("nascimento").style.borderColor = "#999999";
                document.getElementById("nascimento").style.outline = null;
            }
            return false
        }
        return false;
     }