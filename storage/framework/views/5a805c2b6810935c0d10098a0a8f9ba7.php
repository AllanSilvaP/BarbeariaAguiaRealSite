<!DOCTYPE html>

<html lang="pt-br">

<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">

    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">


    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?php echo e(asset('css/index.css')); ?>">
    <link rel="icon" href="<?php echo e(asset('img/barbearia-frente.png')); ?>" type="image/x-icon">
    <title>Barbearia Aguia Real</title>
</head>


<body>
    <nav class="barra-navegador">
        <ul>
            <li><a href="#pag-inicial"><img src="<?php echo e(asset('img/barbearia-frente.png')); ?>" alt=""
                        style="height: 30px; width: 30px;"></a></li>
            <li><a href="#pag-inicial">Pagina Inicial</a></li>
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#contato">Contato</a></li>
            <li><a href="<?php echo e(route('areafunc')); ?>">Area do Funcionario</a></li>
        </ul>
    </nav>

    <div class="pag-inicial" id="pag-inicial">
        <video autoplay loop muted>
            <source src="<?php echo e(asset('videos/VideoFundo3.mp4')); ?>" type="video/mp4">
            Seu navegador não suporta videos
        </video>
        <div class="overlay">

            <h2>Barbearia <br> Águia Real</h2>
            <button><a href="https://wa.me/61982436970" target="_blank"><img src="<?php echo e(asset('img/Whatsaap.png')); ?>"
                        alt="">Agende seu Horário</a></button>
        </div>
    </div>

    <div class="servicos" id="servicos">

        <div class="titulo-servicos">
            <h2>Serviços</h2>
        </div>

        <div class="bt-servicos">
            <ul>
                <button data-dia="segunda">Segunda</a></button>
                <button data-dia="terça">Terça</button>
                <button data-dia="quarta">Quarta</button>
                <button data-dia="quinta">Quinta</button>
                <button data-dia="sexta">Sexta</button>
                <button data-dia="sábado">Sábado</button>
            </ul>
        </div>

        <div class="card-servicos">

            <div class="servico" data-servico="corte">
                <img src="<?php echo e(asset('img/Corte.png')); ?>" alt="">
                <p class="preco-card"></p>
                <p class="texto-card">Corte</p>
            </div>
            <div class="servico" data-servico="barba">
                <img src="<?php echo e(asset('img/Barba.png')); ?>" alt="">
                <p class="preco-card"></p>
                <p class="texto-card">Barba</p>
            </div>
            <div class="servico" data-servico="sombrancelha">
                <img src="<?php echo e(asset('img/Sombrancelha.png')); ?>" alt="">
                <p class="preco-card"></p>
                <p class="texto-card">Sombrancelha</p>
            </div>
            <div class="servico" data-servico="pigmentacao">
                <img src="<?php echo e(asset('img/Pigmentado.png')); ?>" alt="">
                <p class="preco-card"></p>
                <p class="texto-card">Pigmentação</p>
            </div>


            <div class="servico" data-servico="progressiva">
                <img src="<?php echo e(asset('img/Progressiva.png')); ?>" alt="">
                <p class="preco-card"></p>
                <p class="texto-card">Progressiva</p>
            </div>
            <div class="servico" data-servico="luzes">
                <img src="<?php echo e(asset('img/Luzes.png')); ?>" alt="">
                <p class="preco-card"></p>
                <p class="texto-card">Luzes</p>
            </div>
            <div class="servico" data-servico="nevou">
                <img src="<?php echo e(asset('img/Nevou.png')); ?>" alt="">
                <p class="preco-card"></p>
                <p class="texto-card">Nevou</p>
            </div>
            <div class="servico" data-servico="limpezaPele">
                <img src="<?php echo e(asset('img/Limpeza.png')); ?>" alt="">
                <p class="preco-card"></p>
                <p class="texto-card">Limpeza de Pele</p>
            </div>

        </div>
    </div>

    <div class="sobrenos" id="sobrenos">
        <div class="img-canto">
            <img src="<?php echo e(asset('img/ImagemAmostra3.jpg')); ?>" alt="">
            <div>
                <h3 class="titulo-nos">Sobre Nós - Barbearia Águia Real</h3>
                <p class="texto-nos">
                    Seja bem-vindo à Barbearia Águia Real, onde tradição e modernidade se unem para oferecer a você uma
                    experiência única em cuidados masculinos. Inspirados na força e elegância da águia, criamos um
                    espaço dedicado ao homem que valoriza estilo, qualidade e um atendimento personalizado.
                </p>

                <h3 class="titulo-nos">Nossa História</h3>
                <p class="texto-nos">
                    Fundada com a missão de resgatar o charme das barbearias clássicas, a Águia Real é um lugar onde o
                    cuidado pessoal se transforma em um momento especial. Aqui, você encontra um ambiente aconchegante e
                    exclusivo, pensado para oferecer mais do que um corte de cabelo ou barba: um verdadeiro ritual de
                    cuidado.
                </p>
                <h3 class="titulo-nos">Nosso Compromisso</h3>
                <p class="texto-nos">
                    Na Águia Real, cada detalhe é pensado para superar as suas expectativas. Desde o atendimento até a
                    execução dos serviços, nossa equipe está preparada para garantir que você saia daqui não apenas
                    satisfeito, mas renovado e confiante.

                    Venha conhecer a Barbearia Águia Real e descubra o que significa estar no topo do cuidado masculino.
                </p>
            </div>
        </div>
    </div>

    <div class="contato" id="contato">
        <h2>Contato</h2>
        <div class="colunas">

            <div class="item">
                <span>
                    <img src="<?php echo e(asset('img/Telefone.png')); ?>" alt="Telefone">
                    (61) 98243-6970 - (61) 98135-4110
                </span>

                <span>
                    <img src="<?php echo e(asset('img/Endereco.png')); ?>" alt="Endereço">
                    Qnn 22 Conjunto P Lote 28
                </span>
            </div>

            <div class="item">
                <span>
                    <img src="<?php echo e(asset('img/Relogio.png')); ?>" alt="Horário">
                    Segunda a Sábado: 09:00 até às 20:00
                </span>
                <span>
                    <img src="<?php echo e(asset('img/Email.png')); ?>" alt="Email">
                    aguiarealbarbershop@gmail.com
                </span>
            </div>

            <div class="item">
                <a href="https://www.instagram.com/barbearia_aguiareal" target="_blank">
                    <img src="<?php echo e(asset('img/Instagram.png')); ?>" alt="Instagram">
                    barbearia_aguiareal
                </a>
                <a href="https://www.tiktok.com/@barbeariaaguiareal?_t=8sXqhJJ92yj&_r=1" target="_blank">
                    <img src="<?php echo e(asset('img/TikTok.webp')); ?>" alt="TikTok">
                    barbeariaaguiareal
                </a>
            </div>
        </div>
    </div>



    <div class="google-maps">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d570.5812938149008!2d-48.11100684229753!3d-15.835659583658085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935bcdbaced52809%3A0x477fc2608d94836d!2sBarbearia%20Aguia%20Real!5e0!3m2!1sen!2sbr!4v1734461934379!5m2!1sen!2sbr"
            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    </div>

    <footer class="footer">
        <p>© 2024 Barbearia Águia Real</p>
    </footer>


</body>

<script type="module" src="<?php echo e(asset('js/modules/index.js')); ?>" defer></script>

</html>
<?php /**PATH C:\Users\adm\Desktop\BarbeariaAguiaReal\back-end\resources\views/index.blade.php ENDPATH**/ ?>