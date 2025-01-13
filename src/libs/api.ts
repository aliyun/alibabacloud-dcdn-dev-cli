import ESA, * as $ESA from '@alicloud/esa20240910';
import * as $OpenApi from '@alicloud/openapi-client';
import * as $Util from '@alicloud/tea-util';
import { getApiConfig } from '../utils/fileUtils/index.js';
import {
  ApiError,
  ApiMethod,
  OptionalProps,
  Map,
  GetMatchSiteReq,
  GetMatchSiteRes
} from './interface.js';
import logger from './logger.js';
import { CliConfig } from '../utils/fileUtils/interface.js';

class Client {
  client: ESA.default;

  constructor() {
    const config = getApiConfig();
    this.client = Client.createClient(config);
  }

  static createClient(config: CliConfig): ESA.default {
    const apiConfig = new $OpenApi.Config({
      accessKeyId: config.auth?.accessKeyId,
      accessKeySecret: config.auth?.accessKeySecret,
      endpoint: config.endpoint
    });
    return new ESA.default(apiConfig);
  }

  updateConfig(config: CliConfig) {
    this.client = Client.createClient(config);
  }

  callApi = async <RequestType, ResponseType>(
    action: ApiMethod<RequestType, ResponseType>,
    request?: RequestType
  ): Promise<ResponseType> => {
    try {
      logger.info(
        `Called api ${action.name}, Request: ${request ? JSON.stringify(request) : 'no request'}`
      );
      const runtime = new $Util.RuntimeOptions({
        connectTimeout: 10000,
        readTimeout: 10000,
        autoretry: true,
        maxAttempts: 3
      });
      const response = request
        ? await action(request, runtime)
        : await action(runtime);
      return response;
    } catch (error) {
      const err = error as ApiError;
      logger.error(`Code: ${err.code}, Message: ${err.message}}`);
      logger.debug(`Data: ${JSON.stringify(err.data)}`);
      throw err;
    }
  };

  callOpenApi = async <ResponseType>(
    apiName: string,
    requestParams: Map
  ): Promise<ResponseType> => {
    logger.info(
      `Called api ${apiName} with openApi, Request: ${requestParams ? JSON.stringify(requestParams) : 'no request'}`
    );
    try {
      let params = {
        action: apiName,
        version: '2024-09-10',
        protocol: 'https',
        method: 'GET',
        authType: 'AK',
        bodyType: 'json',
        reqBodyType: 'json',
        style: 'RPC',
        pathname: '/',
        toMap: function () {
          return this;
        }
      };
      const request = new $OpenApi.OpenApiRequest(requestParams);
      const runtime = new $Util.RuntimeOptions({
        connectTimeout: 10000,
        readTimeout: 10000,
        autoretry: true,
        maxAttempts: 3
      });
      const response = await this.client.callApi(params, request, runtime);
      return response as ResponseType;
    } catch (error) {
      const err = error as ApiError;
      logger.error(`Code: ${err.code}, Message: ${err.message}}`);
      logger.debug(`Data: ${JSON.stringify(err.data)}`);
      throw err;
    }
  };

  getErService(): Promise<$ESA.GetErServiceResponse> {
    const request = new $ESA.GetErServiceRequest({});
    return this.callApi(
      this.client.getErServiceWithOptions.bind(this.client) as ApiMethod<
        $ESA.GetErServiceRequest,
        $ESA.GetErServiceResponse
      >,
      request
    );
  }

  getRoutineStagingCodeUploadInfo(
    params: OptionalProps<$ESA.GetRoutineStagingCodeUploadInfoRequest>
  ): Promise<$ESA.GetRoutineStagingCodeUploadInfoResponse> {
    const request = new $ESA.GetRoutineStagingCodeUploadInfoRequest(params);
    return this.callApi(
      this.client.getRoutineStagingCodeUploadInfoWithOptions.bind(
        this.client
      ) as ApiMethod<
        $ESA.GetRoutineStagingCodeUploadInfoRequest,
        $ESA.GetRoutineStagingCodeUploadInfoResponse
      >,
      request
    );
  }

  commitRoutineStagingCode(
    params: OptionalProps<$ESA.CommitRoutineStagingCodeRequest>
  ): Promise<$ESA.CommitRoutineStagingCodeResponse> {
    const request = new $ESA.CommitRoutineStagingCodeRequest(params);
    return this.callApi(
      this.client.commitRoutineStagingCodeWithOptions.bind(
        this.client
      ) as ApiMethod<
        $ESA.CommitRoutineStagingCodeRequest,
        $ESA.CommitRoutineStagingCodeResponse
      >,
      request
    );
  }

  publishRoutineCodeVersion(
    params: OptionalProps<$ESA.PublishRoutineCodeVersionRequest>
  ): Promise<$ESA.PublishRoutineCodeVersionResponse> {
    const request = new $ESA.PublishRoutineCodeVersionRequest(params);
    return this.callApi(
      this.client.publishRoutineCodeVersionWithOptions.bind(
        this.client
      ) as ApiMethod<
        $ESA.PublishRoutineCodeVersionRequest,
        $ESA.PublishRoutineCodeVersionResponse
      >,
      request
    );
  }

  getMatchSite(params: GetMatchSiteReq): Promise<GetMatchSiteRes> {
    return this.callOpenApi('getMatchSite', params);
  }

  listRoutineCanaryAreas(): Promise<$ESA.ListRoutineCanaryAreasResponse> {
    return this.callApi(
      this.client.listRoutineCanaryAreasWithOptions.bind(this.client)
    );
  }

  getRoutineUserInfo(): Promise<$ESA.GetRoutineUserInfoResponse> {
    return this.callApi(
      this.client.getRoutineUserInfoWithOptions.bind(this.client)
    );
  }

  deleteRoutine(
    params: OptionalProps<$ESA.DeleteRoutineRequest>
  ): Promise<$ESA.DeleteRoutineResponse> {
    const request = new $ESA.DeleteRoutineRequest(params);
    return this.callApi(
      this.client.deleteRoutineWithOptions.bind(this.client) as ApiMethod<
        $ESA.DeleteRoutineRequest,
        $ESA.DeleteRoutineResponse
      >,
      request
    );
  }

  deleteRoutineCodeVersion(
    params: OptionalProps<$ESA.DeleteRoutineCodeVersionRequest>
  ): Promise<$ESA.DeleteRoutineCodeVersionResponse> {
    const request = new $ESA.DeleteRoutineCodeVersionRequest(params);
    return this.callApi(
      this.client.deleteRoutineCodeVersionWithOptions.bind(
        this.client
      ) as ApiMethod<
        $ESA.DeleteRoutineCodeVersionRequest,
        $ESA.DeleteRoutineCodeVersionResponse
      >,
      request
    );
  }

  createRoutineRelatedRoute(
    params: OptionalProps<$ESA.CreateRoutineRelatedRouteRequest>
  ): Promise<$ESA.CreateRoutineRelatedRouteResponse> {
    const request = new $ESA.CreateRoutineRelatedRouteRequest(params);
    return this.callApi(
      this.client.createRoutineRelatedRouteWithOptions.bind(
        this.client
      ) as ApiMethod<
        $ESA.CreateRoutineRelatedRouteRequest,
        $ESA.CreateRoutineRelatedRouteResponse
      >,
      request
    );
  }

  deleteRoutineRelatedRoute(
    params: OptionalProps<$ESA.DeleteRoutineRelatedRouteRequest>
  ): Promise<$ESA.DeleteRoutineRelatedRouteResponse> {
    const request = new $ESA.DeleteRoutineRelatedRouteRequest(params);
    return this.callApi(
      this.client.deleteRoutineRelatedRouteWithOptions.bind(
        this.client
      ) as ApiMethod<
        $ESA.DeleteRoutineRelatedRouteRequest,
        $ESA.DeleteRoutineRelatedRouteResponse
      >,
      request
    );
  }

  listSites(
    params: OptionalProps<$ESA.ListSitesRequest>
  ): Promise<$ESA.ListSitesResponse> {
    const request = new $ESA.ListSitesRequest(params);
    return this.callApi(
      this.client.listSitesWithOptions.bind(this.client) as ApiMethod<
        $ESA.ListSitesRequest,
        $ESA.ListSitesResponse
      >,
      request
    );
  }

  getRoutineStagingEnvIp(): Promise<$ESA.GetRoutineStagingEnvIpResponse> {
    return this.callApi(
      this.client.getRoutineStagingEnvIpWithOptions.bind(this.client)
    );
  }

  getRoutine(
    params: OptionalProps<$ESA.GetRoutineRequest>
  ): Promise<$ESA.GetRoutineResponse> {
    const request = new $ESA.GetRoutineRequest(params);
    return this.callApi(
      this.client.getRoutineWithOptions.bind(this.client) as ApiMethod<
        $ESA.GetRoutineRequest,
        $ESA.GetRoutineResponse
      >,
      request
    );
  }

  createRoutine(
    params: OptionalProps<$ESA.CreateRoutineRequest>
  ): Promise<$ESA.CreateRoutineResponse> {
    const request = new $ESA.CreateRoutineRequest(params);
    return this.callApi(
      this.client.createRoutineWithOptions.bind(this.client) as ApiMethod<
        $ESA.CreateRoutineRequest,
        $ESA.CreateRoutineResponse
      >,
      request
    );
  }

  listRoutineOptionalSpecs(): Promise<$ESA.ListRoutineOptionalSpecsResponse> {
    return this.callApi(
      this.client.listRoutineOptionalSpecsWithOptions.bind(this.client)
    );
  }

  createRoutineRelatedRecord(
    params: OptionalProps<$ESA.CreateRoutineRelatedRecordRequest>
  ): Promise<$ESA.CreateRoutineRelatedRecordResponse> {
    const request = new $ESA.CreateRoutineRelatedRecordRequest(params);
    return this.callApi(
      this.client.createRoutineRelatedRecordWithOptions.bind(
        this.client
      ) as ApiMethod<
        $ESA.CreateRoutineRelatedRecordRequest,
        $ESA.CreateRoutineRelatedRecordResponse
      >,
      request
    );
  }

  deleteRoutineRelatedRecord(
    params: OptionalProps<$ESA.DeleteRoutineRelatedRecordRequest>
  ): Promise<$ESA.DeleteRoutineRelatedRecordResponse> {
    const request = new $ESA.DeleteRoutineRelatedRecordRequest(params);
    return this.callApi(
      this.client.deleteRoutineRelatedRecordWithOptions.bind(
        this.client
      ) as ApiMethod<
        $ESA.DeleteRoutineRelatedRecordRequest,
        $ESA.DeleteRoutineRelatedRecordResponse
      >,
      request
    );
  }
}

export default new Client();