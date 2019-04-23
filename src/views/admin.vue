<template>
  <div class="app-container">
    <div class="admin-login" v-if="!isShow">
      <el-form :model="loginForm" status-icon ref="loginForm" label-width="100px" class="loginForm">
        <h3>&nbsp;管理页面登陆</h3>
        <el-form-item label="用户名" prop="pass">
          <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
          <el-input type="password" v-model="loginForm.userpwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="admin" v-if="isShow">
      <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" style="font-size:24px;font-weight:bold">图片列表管理</el-menu-item>
      </el-menu>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="_id" label="图片_id" width="180"></el-table-column>
        <el-table-column prop="authorName" label="作者" width="180"></el-table-column>
        <el-table-column prop="imgSrc" label="图片地址"></el-table-column>
        <el-table-column prop="detail" label="简介"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row),dialogTableVisible = true"
              type="text"
              size="small"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="handleClick(scope.row),centerDialogVisible = true"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编辑简介" :visible.sync="dialogTableVisible">
        <p>图片_id</p>
        <el-input v-model="editForm._id" disabled></el-input>
        <p>作者</p>
        <el-input v-model="editForm.authorName" disabled></el-input>
        <p>图片地址</p>
        <el-input v-model="editForm.imgSrc" disabled></el-input>
        <p>简介</p>
        <el-input v-model="editForm.detail"></el-input>
        <p></p>
        <el-button type="primary" @click="editPicDetail">确认编辑</el-button>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
        <span>确定要删除该条数据</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="delectPic">确 定</el-button>
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isShow: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      centerDialogVisible: false,
      editForm: [],
      loginForm: {
        username: "admin",
        userpwd: "admin"
      },
      tableData: []
    };
  },
  methods: {
    handleClick(row) {
      this.editForm = row;
    },
    open() {
      this.$alert("这是一段内容", "标题名称", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: `action: ${action}`
          });
        }
      });
    },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          axios
            .post("/users/login", {
              username: this.loginForm.username,
              userpwd: this.loginForm.userpwd
            })
            .then(response => {
              let res = response.data;
              if (res.status == "0") {
                if (res.result.username === "admin") {
                  this.isShow = true;
                  this.getAllPic();
                  this.$message("登陆成功");
                } else {
                  this.$message("此用户没有权限");
                }
              } else {
                this.$message(res.msg);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getAllPic() {
      axios.get("/users/getPic").then(response => {
        let res = response.data;
        this.tableData = [];
        if (res.status == "0") {
          let list = res.result.list;
          list.forEach(ele => {
            ele.authorName = ele.author.username;
            this.tableData.push(ele);
          });
        } else {
          this.$message("未读取到信息");
        }
      });
    },
    editPicDetail() {
      axios
        .post("/users/editPicDetail", {
          imgSrc: this.editForm.imgSrc,
          detail: this.editForm.detail
        })
        .then(response => {
          let res = response.data;
          this.$message("编辑成功");
          this.getAllPic();
        });
      this.dialogTableVisible = false;
    },
    delectPic() {
      axios
        .post("/users/delectPic", {
          id: this.editForm._id
        })
        .then(response => {
          let res = response.data;
              this.getAllPic();
          this.$message("删除成功");
        });
      this.centerDialogVisible = false;
    }
  }
};
</script>
