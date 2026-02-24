{
  description = "mukoworks using Astro";

  inputs = {
      nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
      flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          # 開発に必要なパッケージ
          buildInputs = [
            pkgs.nodejs_24
          ];

          # 開発環境のセットアップコマンド
          shellHook = ''
              node -v
            '';
        };
      });
}