function initLab(dom, options) {
  //Variáveis globais
  var processingInstance;
  var $this = $(dom);
  var textarea = $this.find('textarea');
  var codeid = $this.attr('codeid');
  var canvas = $this.find('canvas');
  var messagecontainer = $this.find('.messagecontainer');

  //carrega código previamente gravado
  if (codeid && typeof(Storage) !== "undefined") {
      try {
          var existentCode = window.localStorage.getItem(codeid);
          if(existentCode) {
              textarea.val(existentCode);
          }
      } catch (err) {}
  }

  //inicia editor CodeMirror
  var codemirror = CodeMirror.fromTextArea(textarea[0], {
      lineNumbers: true,
      dragDrop: false,
      autofocus: false
  });
  $this.data('codemirror', codemirror);

  $this.on('click', '.execute', function(evt) {
      //limpa e esconde mensagem de erro
      messagecontainer.html('').hide();

      //interrompe processing anterior
      try {
          processingInstance.exit();
      } catch(err) {}

      //limpa o canvas
      try {
          canvas[0].getContext('2d').clearRect(0, 0, canvas[0].width, canvas[0].height);
      } catch(err) {}

      var processingCode = codemirror.getValue();
      //salva código no localStorage
      if (codeid && typeof(Storage) !== "undefined") {
          try {
              window.localStorage.setItem(codeid, processingCode);
          } catch (err) {}
      }

      var compilation;
      try {
          compilation = Processing.compile(processingCode);
      } catch (err) {
          messagecontainer.show().html('Erro de sintaxe do programa');
          return;
      }
      try {
          processingInstance = new Processing(canvas[0], compilation);
      } catch(err) {
          messagecontainer.show().html('Erro no programa: ' + err.description);
          return;
      }
      $this.trigger(jQuery.Event('lab-execute', { code: processingCode}) );
  });

  $this.trigger(jQuery.Event('lab-init', { codemirror: codemirror}) );

}

$(function() {
    $('.laboratorio').each(function() {
      initLab(this);
    });
});

function initExample(dom) {
  var $this = $(dom);
  var code = $this.find('code').html();
  Prism.highlightElement($this.find('code')[0], false);
  var existingProcessing = $this.data('processinginstance');
  if(existingProcessing) {
    existingProcessing.exit();
    $this.removeData('processinginstance');
  }

  var processing = new Processing($this.find('canvas')[0], code);
  $this.data('processinginstance', processing);
}

//carrega exemplos
$('.example').each(function() {
  initExample(this);
});

//carrega prism em outros campos (ex: referência)
$('.autoprism').each(function() {
    Prism.highlightElement(this);
});
