# Portfolio 定期维护清单

## 每周 (Weekly)
- [ ] 检查 Vercel 部署状态和 Analytics 面板
- [ ] 检查 GitHub Actions CI 是否有失败的 workflow run

## 每月 (Monthly) 
- [ ] `npm audit` — 检查依赖安全漏洞
- [ ] `npx npm-check-updates -u` — 更新过时依赖（注意 breaking changes）
- [ ] 运行完整测试套件 `npx vitest run && npx playwright test`
- [ ] 检查 Lighthouse 分数（Performance / Accessibility / SEO）

## 每季度 (Quarterly)
- [ ] 审查 Next.js 主版本更新
- [ ] 审查 CSP 和安全头配置是否需要调整
- [ ] 清理未使用的依赖 `npx depcheck`
- [ ] 审查 API rate-limit 阈值是否合理

## 发布流程
1. 确保所有测试通过：`npx vitest run`
2. 更新 `CHANGELOG.md`
3. Commit with conventional message: `feat:` / `fix:` / `chore:`
4. 打版本 tag: `git tag -a vX.Y.Z -m "description"`
5. Push: `git push origin master --tags`
6. 验证 Vercel 自动部署
