import React from 'react'
import { useAppSelector } from 'store/hooks';
import { RecipientProps } from 'components/Recipient/types';

function RecipientComponent(props: RecipientProps) {
    const systemAdminStatus = useAppSelector(
        (state) => state.user.systemAdminStatus
    );
  return (
    <div className="mb-3">
            {systemAdminStatus && (
                <div className="mx-3 py-3 btn-group">
                    <label htmlFor="formFileLg">Upload Recipients</label>
                    <input
                        className="form-control form-control-lg"
                        id="formFileLg"
                        type="file"
                        accept=".csv"
                        onChange={props.handleUploadChange}
                    />
                    <button
                        className="btn btn-dark btn-lg"
                        onClick={props.uploadRecipients}
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
  )
}

export default RecipientComponent