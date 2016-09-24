import { Injectable } from '@angular/core';
import {
  NodePaging,
  MinimalNodeEntryEntity,
  DeletedNodesPaging,
  MinimalNode,
  MinimalNodeEntity,
  DeletedNodeEntity
} from 'alfresco-js-api';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable()
export class NodeService {

  static DEFAULT_MIME_TYPE_ICON: string = 'ft_ic_miscellaneous.svg';

  private baseImagePath = 'build/images';

  mimeTypeIcons: any = {
    'image/png': 'ft_ic_raster_image.svg',
    'image/jpeg': 'ft_ic_raster_image.svg',
    'image/gif': 'ft_ic_raster_image.svg',
    'application/pdf': 'ft_ic_pdf.svg',
    'application/vnd.ms-excel': 'ft_ic_ms_excel.svg',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'ft_ic_ms_excel.svg',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template': 'ft_ic_ms_excel.svg',
    'application/msword': 'ft_ic_ms_word.svg',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'ft_ic_ms_word.svg',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template': 'ft_ic_ms_word.svg',
    'application/vnd.ms-powerpoint': 'ft_ic_ms_powerpoint.svg',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'ft_ic_ms_powerpoint.svg',
    'application/vnd.openxmlformats-officedocument.presentationml.template': 'ft_ic_ms_powerpoint.svg',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow': 'ft_ic_ms_powerpoint.svg',
    'video/mp4': 'ft_ic_video.svg',
    'text/plain': 'ft_ic_document.svg',
    'application/x-javascript': 'ft_ic_document.svg',
    'application/json': 'ft_ic_document.svg',
    'image/svg+xml': 'ft_ic_vector_image.svg',
    'text/html': 'ft_ic_website.svg',
    'application/x-compressed': 'ft_ic_archive.svg',
    'application/x-zip-compressed': 'ft_ic_archive.svg',
    'application/zip': 'ft_ic_archive.svg',
    'application/vnd.apple.keynote': 'ft_ic_presentation.svg',
    'application/vnd.apple.pages': 'ft_ic_document.svg',
    'application/vnd.apple.numbers': 'ft_ic_spreadsheet.svg'
  };

  constructor(private api: ApiService,
              private auth: AuthService) {
  }

  getNodeThumbnailUrl(node: MinimalNode): string {
    if (node.isFolder) {
      return `${this.baseImagePath}/ft_ic_folder.svg`;
    }

    if (node.isFile) {
      if (node.content) {
        let mimeType = node.content.mimeType;
        if (mimeType) {
          let icon = this.getMimeTypeIcon(mimeType);
          if (icon) {
            return `${this.baseImagePath}/${icon}`;
          }
        }
      }
    }

    return `${this.baseImagePath}/${NodeService.DEFAULT_MIME_TYPE_ICON}`;
  }

  getMimeTypeIcon(mimeType: string): string {
    let icon = this.mimeTypeIcons[mimeType];
    return icon || NodeService.DEFAULT_MIME_TYPE_ICON;
  }

  getNodeChildren(nodeId: string): Promise<NodePaging> {
    let options = {
      include: ['path']
    };
    let api = this.api.getInstance();
    return api.nodes.getNodeChildren(nodeId || '-root-', options);
  }

  getNodeInfo(nodeId: string): Promise<MinimalNodeEntryEntity> {
    let api = this.api.getInstance();
    return api.nodes.getNodeInfo(nodeId);
  }

  getContentUrl(nodeId: string): string {
    let api = this.api.getInstance();
    return api.content.getContentUrl(nodeId);
  }

  isImage(node: MinimalNode): boolean {
    if (node && node.isFile && node.content) {
      let mimeType = node.content.mimeType;
      return ['image/png', 'image/jpeg', 'image/gif'].indexOf(mimeType) > -1;
    }
    return false;
  }

  deleteNode(nodeId: string): Promise<any> {
    let api = this.api.getInstance();
    return api.nodes.deleteNode(nodeId);
  }

  getDeletedNodes(): Promise<DeletedNodesPaging> {
    let api = this.api.getInstance();
    return api.nodes.getDeletedNodes({});
  }

  getDeletedNode(nodeId: string): Promise<DeletedNodeEntity> {
    let api = this.api.getInstance();
    return api.nodes.getDeletedNode(nodeId, {});
  }

  purgeDeletedNode(nodeId: string): Promise<any> {
    let api = this.api.getInstance();
    return api.nodes.purgeDeletedNode(nodeId);
  }

  restoreNode(nodeId: string): Promise<MinimalNodeEntity> {
    let api = this.api.getInstance();
    return api.nodes.restoreNode(nodeId);
  }

}
