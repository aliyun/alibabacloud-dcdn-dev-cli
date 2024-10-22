import { it, describe, expect, vi } from 'vitest';
import { handleListDeployments } from '../../../src/commands/deployments/list.js';
import { mockConsoleMethods } from '../../helper/mockConsole.js';
import { ApiService } from '../../../src/libs/apiService.js';

describe('handle display deployments', () => {
  let std = mockConsoleMethods();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should handle display deployments success', async () => {
    await handleListDeployments({
      _: [],
      $0: ''
    });
    expect(std.out).toMatchInlineSnapshot(`
      [MockFunction log] {
        "calls": [
          [
            "Staging",
          ],
          [
            "Staging IP: 0.0.0.0",
          ],
          [
            "┌───────────────┬───────────────────┐
      │ Version       │ productionVersion │
      ├───────────────┼───────────────────┤
      │ Specification │ 100ms             │
      └───────────────┴───────────────────┘",
          ],
          [
            " ",
          ],
          [
            " ",
          ],
          [
            "Production ●",
          ],
          [
            "┌───────────────┬────────────────┐
      │ Version       │ stagingVersion │
      ├───────────────┼────────────────┤
      │ Specification │ 50ms           │
      └───────────────┴────────────────┘",
          ],
          [
            " ",
          ],
          [
            " ",
          ],
          [
            "Canary ",
          ],
          [
            "┌───────────────┬──────┐
      │ Version       │      │
      ├───────────────┼──────┤
      │ Specification │ 50ms │
      └───────────────┴──────┘",
          ],
          [
            " ",
          ],
          [
            "💬 You can visit: undefined",
          ],
          [
            " ",
          ],
          [
            "Active Staging",
          ],
          [
            "Active Production",
          ],
          [
            "┌─────────────────────────┬─────────────────────────┬───────────────┐
      │ Version                 │ Created                 │ Description   │
      ├─────────────────────────┼─────────────────────────┼───────────────┤
      │ unstable                │ 2021/01/01 00:00:00     │               │
      ├─────────────────────────┼─────────────────────────┼───────────────┤
      │ v1                      │ 2021/01/01 00:00:00     │               │
      ├─────────────────────────┼─────────────────────────┼───────────────┤
      │ v2                      │ 2021/01/01 00:00:00     │               │
      └─────────────────────────┴─────────────────────────┴───────────────┘",
          ],
          [
            " ",
          ],
        ],
        "results": [
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
        ],
      }
    `);
  });

  it('should handle display deployments -- show env ip error', async () => {
    vi.mocked(
      (await ApiService.getInstance()).getRoutineStagingEnvIp
    ).mockResolvedValue({} as any);
    await handleListDeployments({
      _: [],
      $0: ''
    });
    expect(std.out).toMatchInlineSnapshot(`
      [MockFunction log] {
        "calls": [
          [
            "Staging",
          ],
          [
            "┌───────────────┬───────────────────┐
      │ Version       │ productionVersion │
      ├───────────────┼───────────────────┤
      │ Specification │ 100ms             │
      └───────────────┴───────────────────┘",
          ],
          [
            " ",
          ],
          [
            " ",
          ],
          [
            "Production ●",
          ],
          [
            "┌───────────────┬────────────────┐
      │ Version       │ stagingVersion │
      ├───────────────┼────────────────┤
      │ Specification │ 50ms           │
      └───────────────┴────────────────┘",
          ],
          [
            " ",
          ],
          [
            " ",
          ],
          [
            "Canary ",
          ],
          [
            "┌───────────────┬──────┐
      │ Version       │      │
      ├───────────────┼──────┤
      │ Specification │ 50ms │
      └───────────────┴──────┘",
          ],
          [
            " ",
          ],
          [
            "💬 You can visit: undefined",
          ],
          [
            " ",
          ],
          [
            "Active Staging",
          ],
          [
            "Active Production",
          ],
          [
            "┌─────────────────────────┬─────────────────────────┬───────────────┐
      │ Version                 │ Created                 │ Description   │
      ├─────────────────────────┼─────────────────────────┼───────────────┤
      │ unstable                │ 2021/01/01 00:00:00     │               │
      ├─────────────────────────┼─────────────────────────┼───────────────┤
      │ v1                      │ 2021/01/01 00:00:00     │               │
      ├─────────────────────────┼─────────────────────────┼───────────────┤
      │ v2                      │ 2021/01/01 00:00:00     │               │
      └─────────────────────────┴─────────────────────────┴───────────────┘",
          ],
          [
            " ",
          ],
        ],
        "results": [
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
        ],
      }
    `);
  });
});
