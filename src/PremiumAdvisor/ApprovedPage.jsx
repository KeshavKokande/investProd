import React from "react";

function ApprovedPage(){
    return(
<div class="col-xl-8 col-md-6">
              <div class="card Recent-Users">
                  <div class="card-header">
                      <h5>Recent Users</h5>
                  </div>
                  <div class="card-body px-0 py-3">
                      <div class="table-responsive">
                          <table class="table table-hover">
                              <tbody>
                                  <tr class="unread">
                                      <td><img class="rounded-circle" style={{width: '40px'}} src="" alt="activity-user" /></td>
                                      <td>
                                          <h6 class="mb-1">Isabella Christensen</h6>
                                          <p class="m-0">Lorem Ipsum is simply dummy</p>
                                      </td>
                                      <td>
                                          <h6 class="text-muted"><i class="fas fa-circle text-success f-10 m-r-15"></i>11 MAY 12:56</h6>
                                      </td>
                                      <td><a href="#!" class="badge me-2 bg-brand-color-2 text-white f-12">Reject</a><a href="#!" class="badge me-2 bg-brand-color-1 text-white f-12">Approve</a></td>
                                  </tr>
                                  <tr class="unread">
                                      <td><img class="rounded-circle" style={{width:"40px"}} src="" alt="activity-user" /></td>
                                      <td>
                                          <h6 class="mb-1">Mathilde Andersen</h6>
                                          <p class="m-0">Lorem Ipsum is simply</p>
                                      </td>
                                      <td>
                                          <h6 class="text-muted"><i class="fas fa-circle text-danger f-10 m-r-15"></i>11 MAY 10:35</h6>
                                      </td>
                                      <td><a href="#!" class="badge me-2 bg-brand-color-2 text-white f-12">Reject</a><a href="#!" class="badge me-2 bg-brand-color-1 text-white f-12">Approve</a></td>
                                  </tr>
                                  <tr class="unread">
                                      <td><img class="rounded-circle" style={{width:"40px"}} src="" alt="activity-user" /></td>
                                      <td>
                                          <h6 class="mb-1">Karla Sorensen</h6>
                                          <p class="m-0">Lorem Ipsum is simply dummy</p>
                                      </td>
                                      <td>
                                          <h6 class="text-muted"><i class="fas fa-circle text-success f-10 m-r-15"></i>9 MAY 17:38</h6>
                                      </td>
                                      <td><a href="#!" class="badge me-2 bg-brand-color-2 text-white f-12">Reject</a><a href="#!" class="badge me-2 bg-brand-color-1 text-white f-12">Approve</a></td>
                                  </tr>
                                  <tr class="unread">
                                      <td><img class="rounded-circle" style={{width:"40px"}} src="" alt="activity-user" /></td>
                                      <td>
                                          <h6 class="mb-1">Ida Jorgensen</h6>
                                          <p class="m-0">Lorem Ipsum is simply</p>
                                      </td>
                                      <td>
                                          <h6 class="text-muted f-w-300"><i class="fas fa-circle text-danger f-10 m-r-15"></i>19 MAY 12:56</h6>
                                      </td>
                                      <td><a href="#!" class="badge me-2 bg-brand-color-2 text-white f-12">Reject</a><a href="#!" class="badge me-2 bg-brand-color-1 text-white f-12">Approve</a></td>
                                  </tr>
                                  <tr class="unread">
                                      <td><img class="rounded-circle" style={{width:"40px"}} src="" alt="activity-user" /></td>
                                      <td>
                                          <h6 class="mb-1">Albert Andersen</h6>
                                          <p class="m-0">Lorem Ipsum is</p>
                                      </td>
                                      <td>
                                          <h6 class="text-muted"><i class="fas fa-circle text-success f-10 m-r-15"></i>21 July 12:56</h6>
                                      </td>
                                      <td><a href="#!" class="badge me-2 bg-brand-color-2 text-white f-12">Reject</a><a href="#!" class="badge me-2 bg-brand-color-1 text-white f-12">Approve</a></td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
    )
}

export default ApprovedPage