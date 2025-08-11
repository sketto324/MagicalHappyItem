document.addEventListener('DOMContentLoaded', () => {
    // --- データ定義 ---
    const luckyItems = [
        { id: 1, name: 'ラメ入りシャープペン', comment: 'ひらめきがどんどん湧いてくる予感。新しいアイデアが形になる日！', image: 'images/01.png' },
        { id: 2, name: 'パステルピンクのジェルペン', comment: 'やさしい気持ちが言葉にのる日。メッセージを書くと幸運が舞い込みそう。', image: 'images/02.png' },
        { id: 3, name: 'パステルカラーの消しゴム', comment: '過去のモヤモヤを消し去って、心がすっきり。前向きに進める日。', image: 'images/03.png' },
        { id: 4, name: '星柄マスキングテープ', comment: '小さな工夫が大きな喜びに。手作りや飾りつけで運気アップ！', image: 'images/04.png' },
        { id: 5, name: '小花柄メモ帳', comment: '忘れたくない瞬間をメモすると、素敵な未来につながりそう。', image: 'images/05.png' },
        { id: 6, name: '透明ファイル（柄入り）', comment: '整理整頓でチャンスをキャッチ。心も机もスッキリ！', image: 'images/06.png' },
        { id: 7, name: 'キラキラのじょうぎ', comment: '計画を立てると運気が整う日。数字や距離を測るといいことがありそう。', image: 'images/07.png' },
        { id: 8, name: 'クリスタル風ビーズブレスレット', comment: '小さな輝きがあなたを守る。大事な場面で勇気をくれる日。', image: 'images/08.png' },
        { id: 9, name: 'ハート型キーホルダー', comment: '好きなものを大切にすると、愛され運アップ。鍵を飾っておでかけしよう！', image: 'images/09.png' },
        { id: 10, name: 'ふわふわパステルカラーのヘアゴム', comment: 'かわいいヘアスタイルで気分も運気もアップ。新しい結び方に挑戦！', image: 'images/10.png' },
        { id: 11, name: '星型キャンディー', comment: '甘い時間が幸運を呼ぶ。ひと休みすればステキなひらめきがやってくる日。', image: 'images/11.png' },
        { id: 12, name: 'リボン付きパステルヘアクリップ', comment: 'おしゃれを楽しむことで魅力が開花。写真を撮るといい思い出になる日。', image: 'images/12.png' },
        { id: 13, name: '月モチーフのネックレス', comment: 'ひそかな願いが叶う予感。夜空を見上げて願い事をしてみて。', image: 'images/13.png' },
        { id: 14, name: 'マカロン形ストラップ', comment: '小さなかわいいが幸せを運ぶ日。持ち歩くと笑顔が増えそう。', image: 'images/14.png' },
        { id: 15, name: '星型シールセット', comment: '夢をひとつ叶えるきっかけが見つかる日。ノートに星を貼ってみよう。', image: 'images/15.png' },
        { id: 16, name: 'パステルパープルのミニポーチ', comment: '大事なものを入れて持ち歩くと、守られている安心感がもらえる日。', image: 'images/16.png' },
        { id: 17, name: 'ローズ柄ハンカチ', comment: 'やさしい気遣いが運気アップにつながる。ハンカチはお守り代わりに。', image: 'images/17.png' },
        { id: 18, name: 'ふわふわポンポンチャーム', comment: '楽しい出来事が舞い込む予感。ポンポンのように気持ちも軽く！', image: 'images/18.png' },
        { id: 19, name: 'スパンコール付きノート', comment: 'キラキラ輝く未来が待っている。目標や夢を書き出してみよう。', image: 'images/19.png' },
        { id: 20, name: 'フラワー柄ポーチ', comment: '花のように笑顔が咲く日。ポーチに入れたものが幸運のカギに。', image: 'images/20.png' }
    ];

    // --- DOM要素の取得 ---
    const cardContainer = document.getElementById('card-container');
    const resultContainer = document.getElementById('result-container');
    const resultImage = document.getElementById('result-image');
    const resultName = document.getElementById('result-name');
    const resultComment = document.getElementById('result-comment');
    const footerMessage = document.getElementById('footer-message');
    const description = document.querySelector('.description');

    let isCardChosen = false;

    // --- 初期化処理 ---
    function init() {
        createCards();
    }

    // --- カードを3枚生成 ---
    function createCards() {
        for (let i = 0; i < 3; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-face card-back">
                    <div class="card-back-design">
                        <span>🌙</span>
                    </div>
                </div>
                <div class="card-face card-front"></div>
            `;
            card.addEventListener('click', handleCardClick);
            cardContainer.appendChild(card);
        }
    }

    // --- カードクリック時の処理 ---
    function handleCardClick(event) {
        if (isCardChosen) return; // 1回しか選べないようにする
        isCardChosen = true;

        const chosenCard = event.currentTarget;

        // ランダムにアイテムを選ぶ
        const randomIndex = Math.floor(Math.random() * luckyItems.length);
        const selectedItem = luckyItems[randomIndex];

        // 結果を表示する準備
        resultImage.src = selectedItem.image;
        resultImage.alt = selectedItem.name;
        resultName.textContent = selectedItem.name;
        resultComment.textContent = selectedItem.comment;

        // アニメーションの実行
        flipAndShowResult(chosenCard);
    }

    // --- アニメーションと結果表示 ---
    function flipAndShowResult(chosenCard) {
        // 選んだカードをめくる
        chosenCard.classList.add('is-flipped');

        // 他のカードをフェードアウトさせる
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            if (card !== chosenCard) {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
            }
        });

        // 1.5秒後に結果を表示
        setTimeout(() => {
            description.classList.add('hidden');
            cardContainer.classList.add('hidden');
            resultContainer.classList.remove('hidden');
            footerMessage.classList.remove('hidden');
        }, 1500);
    }

    // --- 実行 ---
    init();
});