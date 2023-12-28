import { useRef, useState, useEffect } from 'react';

import { FormattedMessage } from 'react-intl';

import { useNavigate } from 'react-router-domv6';
import { useDispatch, useSelector } from 'react-redux';

import { filterDrugs, deleteDrugById, editDrug } from '../../../../services/drugService';

import { toast } from 'react-toastify';

export default function Drug() {
    const [drugs, setDrugs] = useState([]);
    const [name, setName] = useState('');

    const { isLoggedIn, userInfo, language } = useSelector((state) => ({
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    }));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(async () => {
        let res = await filterDrugs({ name: '' });
        if (res) setDrugs(res.reverse());
    }, []);

    const handleOnChangeInput = (event) => {
        let valueInput = event.target.value;
        setName(valueInput);
    };

    const handleFilter = async () => {
        let res = await filterDrugs({ name: name });
        if (res) setDrugs(res);
    };

    const handleReload = async () => {
        setName('');
        let res = await filterDrugs({ name: '' });
        if (res) setDrugs(res.reverse());
    };

    const handleDeleteDrug = async (drugId) => {
        await deleteDrugById(drugId);
        handleReload();
    };

    return (
        <div>
            <div className="title mb-60">
                <FormattedMessage id="admin.manage-drug.title" />
            </div>

            <div class="row mb-60 p-15">
                <div class="col-12">
                    <h3 class="mt-8">
                        <FormattedMessage id="medical-history.filters" />
                    </h3>
                </div>
                <div class="col-3">
                    <div class="form-group">
                        <label for="name">
                            <FormattedMessage id="admin.manage-doctor.name" />
                        </label>
                        <input
                            type="text"
                            value={name}
                            class="form-control"
                            id="name"
                            placeholder=""
                            onChange={(event) => handleOnChangeInput(event)}
                        />
                    </div>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary pointer" onClick={() => handleFilter()}>
                        <FormattedMessage id="medical-history.apply" />
                    </button>
                </div>
            </div>

            <div class="row">
                <div class="col-12 text-right mb-16">
                    <button
                        type="submit"
                        class="btn btn-primary pointer mr-5"
                        onClick={() => {
                            navigate(`/admin-dashboard/manage-drug/create`, { replace: true });
                        }}
                    >
                        <i class="fas fa-plus-circle mr-5"></i>
                        <FormattedMessage id="manage-user.btn-create" />
                    </button>
                    <button type="submit" class="btn btn-primary pointer" onClick={() => handleReload()}>
                        <i class="fas fa-sync-alt mr-5"></i>
                        <FormattedMessage id="medical-history.reset" />
                    </button>
                </div>
            </div>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">
                            <FormattedMessage id="admin.manage-doctor.name" />
                        </th>
                        <th scope="col" class="text-right">
                            &nbsp;
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {drugs.map((drug, index) => {
                        return (
                            <tr>
                                <td scope="row">{index + 1}</td>
                                <td>{drug.name}</td>
                                <td class="text-right">
                                    <button
                                        className="btn-edit"
                                        onClick={() => {
                                            navigate(`/admin-dashboard/manage-drug/edit/${drug.id}`, { replace: true });
                                        }}
                                    >
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button className="btn-delete" onClick={() => handleDeleteDrug(drug.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
