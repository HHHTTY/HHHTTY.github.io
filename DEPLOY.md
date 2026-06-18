# Deploy to GitHub Pages

The site is ready locally. The only missing step is GitHub authentication.

## Repository

Create a public repository named:

```text
HHHTTY.github.io
```

under the GitHub account `HHHTTY`, if it does not already exist.

## Recommended: SSH key

Do not share your GitHub password. Use an SSH key instead.

```bash
ssh-keygen -t ed25519 -C "yuhaitao1588@163.com"
pbcopy < ~/.ssh/id_ed25519.pub
```

Then open GitHub:

```text
Settings -> SSH and GPG keys -> New SSH key
```

Paste the copied public key. After that, run:

```bash
cd /Users/yuhaitao/Documents/HHHTTY.github.io
git push -u origin main
```

GitHub Pages will publish the site at:

```text
https://HHHTTY.github.io
```

## Alternative: Personal Access Token

Use a fine-grained Personal Access Token with access only to the `HHHTTY.github.io` repository and `Contents: Read and write`.

Then switch the remote to HTTPS:

```bash
cd /Users/yuhaitao/Documents/HHHTTY.github.io
git remote set-url origin https://github.com/HHHTTY/HHHTTY.github.io.git
git push -u origin main
```

When Git asks for a password, paste the token, not your GitHub password.
