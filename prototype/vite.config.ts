import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// GitHub project Pages serve at https://<user>.github.io/<repo>/. Derive the
// base from the repository name at build time — GITHUB_REPOSITORY is
// "owner/repo" inside GitHub Actions — so the built asset paths are correct no
// matter what the repo is named (osta, Osta-Prototype, …). Falls back to "/"
// for local dev / preview.
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: repo ? `/${repo}/` : '/',
});
