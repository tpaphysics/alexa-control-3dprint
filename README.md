<p align="center">
  <a href="https://www.amazon.com.br/s?k=alexa"><img src="https://img.shields.io/badge/-Alexa-00CAFF?style=flat-square&logo=amazon-alexa&logoColor=white"></a>
  <a href="https://www.home-assistant.io/"><img src="https://img.shields.io/badge/-Home%20Assistant-41BDF5?style=flat-square&logo=home-assistant&logoColor=white"></a>
  <a href="https://nodered.org/"><img src="https://img.shields.io/badge/-Node--RED-8F0000?style=flat-square&logo=node-red&logoColor=white"></a>
  <a href="https://octoprint.org/"><img src="https://img.shields.io/badge/-OctoPrint-008000?style=flat-square&logo=OctoPrint&logoColor=008000&labelColor=EBF4FA"></a>
  <a href="https://www.hivemq.com/"><img src="https://img.shields.io/badge/HiveMQ-black?style=flat-square&logo=hive&logoColor=yellow"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white"></a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=UqYj4YvFRzk"><img src="https://img.youtube.com/vi/UqYj4YvFRzk/0.jpg" alt="Texto que descreve a imagem ou o vídeo"></a>
</p>

Este é um projeto que permite controlar uma impressora 3D por meio de comandos de voz da Alexa, utilizando uma skill personalizada. A skill é integrada ao HiveMQ, que permite enviar mensagens para tópicos específicos de um broker MQTT. O Node-RED, que roda como add-on no Home Assistant, é configurado para se inscrever nesses tópicos e, quando recebe uma mensagem, envia uma requisição local para a [API do OctoPrint](https://docs.octoprint.org/en/master/api/index.html) para controlar a impressora.

# 📋 Pré-requisitos

Antes de iniciar o projeto, é necessário ter os seguintes requisitos:

- Uma impressora 3D compatível com o OctoPrint
- Duas Raspberry Pi 3B+ ou outro dispositivo que possa executar o Home Assistant e o OctoPrint
- Uma conta na Amazon Web Services (AWS) para fazer importação da [skill](./skill/) da Alexa
- Uma conta no HiveMQ Cloud para enviar mensagens para os tópicos
- Conhecimento básico em Node-RED e automação residencial

# 🔧 Instalação

Para instalar e configurar o projeto, siga os seguintes passos:

1. Instale o OctoPrint na Raspberry Pi que será utilizada para esse fim
2. Instale o Home Assistant na outra Raspberry Pi e adicione os add-ons necessários para executar o Node-RED e o Alexa Media Player
3. Dentro da pasta [lambda](./skill/lambda/.env), renomeie o arquivo **_.env._** example para **_.env_** e preencha com as credenciais do HiveMQ
4. Acesse o [developer.amazon.com](https://developer.amazon.com/pt-BR/alexa/alexa-skills-kit) clique em Skill Builders e depois em Developer Console e crie uma nova skill
5. Importe a pasta [skill](./skill/) em formato zip dentro da nova skill criada
6. Clique na skill, build, Intents, JSON Editor, cole o conteúdo do arquivo [pt-BR.json](./skill/interactionModels/custom/pt-BR.json)
7. Clique em Test, e no campo **Skill _testing is enabled in_** selecione o modo Development
8. No Node-RED, importe os [flows](./flows-node-red.json)
9. Configure o Node-RED para se inscrever nos tópicos do HiveMQ e enviar requisições para o OctoPrint, utilizando a API key do OctoPrint e as credenciais do HiveMQ

## 🤖 Comandos

Diga,

```
ALEXA CONTROLAR COMPUTADOR
```

Ela responderá:

```
O QUE DESEJA ?
```

Você poderá dizer:

1. Para controle dos motores, diga:

- `x 4`
- `y 3`
- `z 2`
- `x -5`
- `y -1`
- `z -2`
- `OBS: limite máximo de 5cm para não estragar os motores!`

2. Para fazer Auto Home, diga:

- `Auto Home`
- `Home X`
- `Home Y`
- `Home Z`

3. Para aquecer o Hotend e Hotbed, diga:

- `Bico 200 graus`
- `Cama 80 graus`

4. Para esfriar o Hotend e Hotbed, diga:

- `Esfriar`

5. Status, temperaturas, diga:

- `Status`

## 📝 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para obter mais informações.

## 📞 Contato

<a href="https://github.com/seu-usuario">
  <img src="https://avatars.githubusercontent.com/u/46402647?s=400&u=5b00ec492908116235f3d0c6eee80b94840b2339&v=4" alt="Foto de perfil" width="80" style="border-radius:50%">
</a>
<br>
<a href="mailto:physics.posgrad@gmail.com">
  <img src="https://img.shields.io/badge/Email-Gmail-D14836?style=flat&logo=gmail&logoColor=white" alt="Email">
</a>
<br>

<a href="seulinkedin.com">
  <img src="https://img.shields.io/badge/LinkedIn-Profile-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>
