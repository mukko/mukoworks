#/bin/sh

# nixのインストール
curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install

# shell再起動後に以下コマンドでdirenvインストール
# nix profile add nixpkgs#direnv nixpkgs#nix-direnv

brew install direnv

# shell設定に追加
eval "$(direnv hook zsh)"

# nix-direnv をインストール
nix profile add nixpkgs#nix-direnv

# ~/.config/direnv/direnvrcに以下を追加
mkdir -p ~/.config/direnv
source $(nix eval --raw nixpkgs#nix-direnv)/share/nix-direnv/direnvrc

# ~/.config/nix/nix.confに以下を追加
experimental-features = nix-command flakes

# リポジトリで
echo "use flake" > .envrc
direnv allow
# シェルを再起動

# flake.nixを作成し、コミットすると、以下のコマンドで環境の構築を開始できる
nix develop
