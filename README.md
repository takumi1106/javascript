# JavaScript 実装まとめ（学習用）

進級制作や日々の学習の中で実装した JavaScript の機能をまとめています。  
UI の挙動やアクセシビリティを意識した実装を中心に取り組みました。

---

```js
## スクロール連動ヘッダー

スクロール方向に応じて、ヘッダーの表示・非表示が切り替わる挙動を実装しています。

- 下にスクロールするとヘッダーが非表示になる  
- 上にスクロールするとヘッダーが再表示される  
- 一定量スクロールした後にのみ動作するよう制御

### 実装内容（JavaScript）

let lastScroll = 0;

window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        // 下スクロール → 隠れる
        document.querySelector(".header").classList.add("hide");
    } else {
        // 上スクロール → 出る
        document.querySelector(".header").classList.remove("hide");
    }

    lastScroll = currentScroll;
});

##　ハンバーガーメニュー(進級制作で使ったもの)

- ハンバーガーメニューの開閉（クラス切り替え）
- `aria-expanded` の更新
- Tab移動の制御とフォーカス移動（アクセシビリティ対応）
- `Escape`キーで閉じる／背景スクロール停止

### 実装内容（JavaScript）

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.js-hamburger');
    const nav = document.querySelector('.js-nav');
    const links = nav?.querySelectorAll('.js-nav-link');

    if (!hamburger || !nav || !links) return;

    const isDesktop = () =>
        window.matchMedia('(min-width: 1024px)').matches;

    /* フォーカス制御 */
    const disableLinks = () => {
        links.forEach(link => {
            link.tabIndex = -1;
        });
    };

    const enableLinks = () => {
        links.forEach(link => {
            link.tabIndex = 0;
        });
    };

    /* メニューを開く */
    const openMenu = () => {
        if (isDesktop()) return;

        nav.hidden = false;
        requestAnimationFrame(() => {
            nav.classList.add('is-active');
        });

        hamburger.classList.add('is-active');
        hamburger.setAttribute('aria-expanded', 'true');

        enableLinks();
        document.body.style.overflow = 'hidden';

        links[0]?.focus();
    };

    /* メニューを閉じる */
    const closeMenu = () => {
        nav.classList.remove('is-active');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');

        disableLinks();
        document.body.style.overflow = '';

        nav.addEventListener(
            'transitionend',
            () => {
                if (!nav.classList.contains('is-active')) {
                    nav.hidden = true;
                }
            },
            { once: true }
        );

        hamburger.focus();
    };

    /* 初期状態 */
    nav.hidden = true;
    disableLinks();

    /* イベント */
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.contains('is-active')
            ? closeMenu()
            : openMenu();
    });

    nav.addEventListener('click', (e) => {
        if (e.target.closest('.js-nav-link')) return;
        closeMenu();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hamburger.classList.contains('is-active')) {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (isDesktop()) {
            closeMenu();
        }
    });
});

## ふわっとする(fade-in)

- スクロールで要素が表示領域に入ったタイミングで、
下からふわっと表示されるアニメーションを実装しています。

### 実装内容（JavaScript）

document.addEventListener('DOMContentLoaded', () => {
    const fadeTargets = document.querySelectorAll('.fade-in, .fade-main, .fade-sub');

    if (fadeTargets.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        fadeTargets.forEach(target => observer.observe(target));
    }
});

## スクロールストップ

- ページ最下部に到達した際に、それ以上スクロールできないよう制御しています。

### 実装内容（JavaScript）

document.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight) {
        window.scrollTo(0, documentHeight - windowHeight);
    }
});
