---
description: Update the Lambda@Edge Router
---

Runs the specialized python script to update the Lambda@Edge code and re-associate it with the CloudFront distribution.
Use this whenever you modify `apps/backend/router/router_lambda.py`.

1. Navigate to the backend directory
2. Run the deployment script

```bash
cd apps/backend
python3 deploy_edge_router.py
```
