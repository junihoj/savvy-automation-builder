'use client'
import React, { useEffect, useRef } from 'react'
import * as LR from '@uploadcare/blocks'
import { useRouter } from 'next/navigation'
import '@uploadcare/blocks/web/lr-file-uploader-regular.min.css';

type Props = {
  onUpload: (e: string) => any
}

LR.registerBlocks(LR)

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter()
  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null)

  useEffect(() => {
    const handleUpload = async (e: any) => {
      console.log("THE WHOLE EVENT \n", e)
      console.log("EVENT DETAILS", e?.details)
      const file = await onUpload(e.detail.cdnUrl)
      if (file) {
        router.refresh()
      }
    }
    ctxProviderRef?.current?.addEventListener('file-upload-success', handleUpload)
  }, [])

  return (
    <div>
      {/* <lr-config
        ctx-name="my-uploader-2"
        pubkey={process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBKEY}
      />

      <lr-file-uploader-regular
        ctx-name="my-uploader-2"
      // css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css`}
      // css-src2={`${process.env.NEXT_PUBLIC_UPLOAD_CARE_CSS_SRC}${LR.PACKAGE_VERSION}${process.env.NEXT_PUBLIC_UPLOAD_CARE_SRC_PACKAGE}`}
      />

      <lr-upload-ctx-provider
        ctx-name="my-uploader-2"
        ref={ctxProviderRef}
      /> */}
      <lr-config
        ctx-name="my-uploader-2"
        pubkey={process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBKEY}
        sourceList="local, url, camera, dropbox"
      ></lr-config>
      <lr-file-uploader-regular
        ctx-name="my-uploader-2"
        class="uc-light"
      ></lr-file-uploader-regular>
      <lr-upload-ctx-provider
        ctx-name="my-uploader-2"
        ref={ctxProviderRef}
      ></lr-upload-ctx-provider>
    </div>
  )
}

export default UploadCareButton
