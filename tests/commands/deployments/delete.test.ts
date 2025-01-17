import { it, describe, expect, vi } from 'vitest';
import { handleDeleteDeployments } from '../../../src/commands/deployments/delete.js';
import { validDomain, validName } from '../../../src/commands/utils.js';
import { mockConsoleMethods } from '../../helper/mockConsole.js';
import { ApiService } from '../../../src/libs/apiService.js';
import logger from '../../../src/libs/logger.js';

describe('handle delete deployments', () => {
  let std = mockConsoleMethods();
  vi.spyOn(logger, 'error').mockImplementation(() => {});

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should handle delete routes success', async () => {
    await handleDeleteDeployments({
      deploymentId: ['id1', 'id2'],
      _: [],
      $0: ''
    });
    expect(std.out).toBeCalledWith(
      expect.stringContaining('Delete success: id1')
    );
    expect(std.out).toBeCalledWith(
      expect.stringContaining('Delete success: id2')
    );
    expect(std.out).toMatchInlineSnapshot(`
      [MockFunction log] {
        "calls": [
          [
            "🎉  SUCCESS  Delete success: id1",
          ],
          [
            "🎉  SUCCESS  Delete success: id2",
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
        ],
      }
    `);
  });

  it('should handle delete routes fail', async () => {
    vi.mocked(
      (await ApiService.getInstance()).deleteRoutineCodeVersion
    ).mockResolvedValue({
      data: {
        Status: 'Error'
      }
    } as any);
    await handleDeleteDeployments({
      deploymentId: ['id1', 'id2'],
      _: [],
      $0: ''
    });
    expect(logger.error).toBeCalledWith('🙅 Delete failed: id1');
    expect(logger.error).toBeCalledWith('🙅 Delete failed: id2');
    expect(std.out).toMatchInlineSnapshot(`[MockFunction log]`);
  });
});
