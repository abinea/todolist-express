<template>
    <div>
        <h1>待办列表</h1>
        <el-button type="primary" size="default" @click="changeVisableDrawer">新增</el-button>

        <el-table :data="form" border stripe>
            <el-table-column align="center" label="id" width="150">
                <template v-slot="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column align="center" label="待办事务" width="250">
                <template v-slot="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column align="center" label="待办内容">
                <template v-slot="scope">{{ scope.row.content }}</template>
            </el-table-column>
            <el-table-column align="center" label="截止时间" width="300">
                <template v-slot="scope">{{ dateFormat(scope.row.endTime) }}</template>
            </el-table-column>
            <el-table-column align="center" label="状态" width="250">
                <template v-slot="scope">
                    <el-tag :type="statusList[scope.row.status]">{{ status[scope.row.status] }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="更改" width="250">
                <template v-slot="scope">
                    <el-button type="primary" size="default" @click="handleFinish(scope.row.id)">完成</el-button>
                    <el-button type="primary" size="default" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button-group style="margin: 40px auto; display: flex; justify-content: space-around">
            <el-button
                @click="lastPage"
                :disabled="page == 1"
                type="primary"
                icon="el-icon-arrow-left"
            >上一页</el-button>
            <el-button @click="nextPage" :disabled="all - (page * 10) <= 0" type="primary">
                下一页
                <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
        </el-button-group>
    </div>
    <el-drawer
        title="喜羊羊与灰太狼"
        v-model="visableDrawer"
        direction="rtl"
        size="30%"
        :destroy-on-close="true"
        :show-close="true"
        :wrapperClosable="true"
    >
        <el-form
            :model="todo"
            ref="todo"
            :rules="rules"
            label-width="120px"
            :inline="false"
            size="normal"
        >
            <el-form-item label="代办标题">
                <el-input v-model="todo.name"></el-input>
            </el-form-item>
            <el-form-item label="代办内容">
                <el-input v-model="todo.content"></el-input>
            </el-form-item>
            <el-form-item label="截止时间">
                <el-date-picker
                    v-model="todo.endTime"
                    type="date"
                    size="normal"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="选择日期时间"
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="newTodo">立即创建</el-button>
                <el-button @click="visableDrawer = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script>
import todolist from "../utils/api"
import dateFormat from "../utils/rf3339format"
import _MessageBox from "element-plus/lib/components/message-box"
export default {
    data() {
        return {
            form: [],
            visableDrawer: false,
            pageSize: "",
            all: "",
            todo: {
                name: "",
                content: "",
                endTime: "",
                status: '1'
            },
            status: {
                "1": "未完成",
                "2": "已完成",
                "3": "删除",
            },
            page: 1,
            statusList: {
                "1": "gray",
                "2": "success",
                "3": "danger",
            }
        }
    },
    created() {
        this.fetchData(-1)
    },
    methods: {
        dateFormat,
        fetchData(status) {
            todolist.GetTodoList(status, this.page).then(async res => {
                console.log(res);
                this.form = res.list.rows
                this.all = res.list.count
                this.pageSize = this.form.length
                console.log(this.form);
            })

        },
        newTodo() {
            let data = JSON.stringify(this.todo)
            data = JSON.parse(data)
            console.log(data);
            todolist.CreateTodo(data).then(async res => {
                console.log(res);
                await this.fetchData(-1)
            })
            this.visableDrawer = false
        },
        changeVisableDrawer() {
            this.visableDrawer = true;
        },
        handleFinish(id) {
            let data = {
                id,
                status: '2'
            }
            todolist.UpdateStatus(data).then(res => {
                console.log(res);
                this.fetchData(-1)
            })
        },
        handleDelete(id) {
            todolist.DeleteTodo(id).then(res => {
                console.log(res);
                this.fetchData(-1)
            })
        },
        lastPage() {
            this.page--;
            this.fetchData(-1, this.page)
        },
        nextPage() {
            this.page++;
            this.fetchData(-1, this.page)
        }
    },
    watch: {
        form(newform, oldform) {
            console.log(newform, oldform)
        }
    }
}
</script>

<style scoped>
/* .app-container {
    display: flex;
    margin: 20px auto;
} */
</style>
