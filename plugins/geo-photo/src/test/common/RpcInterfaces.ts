/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import {
  IModelReadRpcInterface, IModelTileRpcInterface,
  IModelWriteRpcInterface, SnapshotIModelRpcInterface, WipRpcInterface,
  DevToolsRpcInterface,
} from "@bentley/imodeljs-common";

export const rpcInterfaces = [
  IModelReadRpcInterface,
  IModelTileRpcInterface,
  IModelWriteRpcInterface,
  SnapshotIModelRpcInterface,
  WipRpcInterface,
  DevToolsRpcInterface,
];