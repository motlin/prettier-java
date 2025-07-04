# GitHub Actions Workflows

This directory contains automated workflows for the Kempt project.

## Workflows

### 🔄 sync-upstream.yml

Automatically syncs changes from the upstream prettier-java repository.

- **Schedule**: Runs every Monday at 9 AM UTC
- **Manual trigger**: Can be triggered manually with custom branch selection
- **Features**:
  - Fetches latest changes from upstream
  - Creates a new branch with merged changes  
  - Opens a Pull Request automatically
  - Detects and reports merge conflicts
  - Creates issues for conflicts requiring manual resolution

### 📊 monitor-upstream.yml

Monitors the upstream repository for activity and new releases.

- **Schedule**: Runs daily at 8 AM UTC
- **Manual trigger**: Can be triggered manually
- **Features**:
  - Checks for new releases and creates tracking issues
  - Monitors commit activity over the last 7 days
  - Creates weekly summary reports for high-activity periods
  - Helps maintain awareness of upstream development

## Configuration

Both workflows use the default `GITHUB_TOKEN` and require the following repository permissions:
- `contents: write` - For creating branches and pushing changes
- `pull-requests: write` - For creating pull requests
- `issues: write` - For creating issues and summaries

## Usage

### Manual Sync

To manually trigger a sync:
1. Go to Actions tab
2. Select "Sync with Upstream"
3. Click "Run workflow"
4. Optionally specify a different branch to sync from
5. Click "Run workflow"

### Handling Conflicts

When conflicts are detected:
1. A PR will be created with partial changes
2. An issue will be created highlighting the conflicts
3. Check out the branch locally to resolve conflicts
4. Push resolved changes back to the PR
5. Merge when ready

## Upstream Repository

These workflows sync with: https://github.com/jhipster/prettier-java